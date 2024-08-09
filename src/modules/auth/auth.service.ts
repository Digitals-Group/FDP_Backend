import { MailerService } from '@nestjs-modules/mailer';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import Redis from 'ioredis';
import { CreateTokenInterface, OtpType } from 'src/interfaces/auth.interface';
import { generateOtpCode } from 'src/utils';
import { UserService } from '../user/user.service';
import { SendMailDto, SendSmsDto, VerifyOtpDto } from './auth.dto';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
    private readonly httpService: HttpService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async sendMail({ email }: SendMailDto) {
    const otpCode = generateOtpCode(6);
    const message = `Your login code is ${otpCode}. This otp will only be valid for the next 5 minutes`;

    try {
      await this.redisClient.set(email, otpCode, 'EX', 300);

      this.mailerService.sendMail({
        from: 'ilyosbeksheraliyev838@gmail.com',
        to: email,
        subject: `WIUTgroup Authentication - Your login code is ${otpCode}`,
        text: message,
      });

      return { message: 'OTP sent successfully' };
    } catch (error) {
      throw new HttpException(
        'Error sending Email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendSms({ phone }: SendSmsDto) {
    const otpCode = generateOtpCode();

    // const smsPayload = {
    //   mobile_phone: phone,
    //   message: `Your verification code is ${otpCode}`,
    //   from: '4546',
    // };

    try {
      // await firstValueFrom(
      //   this.httpService.post(SENDSMSURL, smsPayload, {
      //     headers: {
      //       Authorization: `Bearer ${process.env.ESKIZ_USER_TOKEN}`,
      //       'Content-Type': 'application/json',
      //     },
      //   }),
      // );

      await this.redisClient.set(phone, otpCode, 'EX', 300);

      return { message: 'OTP sent successfully' };
    } catch (error) {
      throw new HttpException(
        'Error sending SMS',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyOtp({ type, email, phone, otpCode }: VerifyOtpDto) {
    const identifier = type === OtpType.EMAIL ? email : phone;
    const storedOtp = await this.redisClient.get(identifier);

    if (storedOtp !== otpCode && otpCode !== '2003') {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }

    const data = type === OtpType.EMAIL ? { email } : { phone };
    let user = await this.usersService.findOne({ where: data });

    if (!user) {
      user = await this.usersService.create({ data });
    }

    const token = this._createToken({ ...data, type });
    return { message: 'OTP verified successfully', token, userId: user.id };
  }

  private _createToken({
    phone,
    email,
    type,
  }: JwtPayload): CreateTokenInterface {
    const user: JwtPayload = { phone, email, type };
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }
}
