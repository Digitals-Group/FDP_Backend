import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import Redis from 'ioredis';
import {
  CreateTokenInterface,
  LoginInterface,
} from 'src/interfaces/auth.interface';
import { generateOtpCode } from 'src/utils';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto, SendSmsDto, VerifyOtpDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
    private readonly httpService: HttpService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async register(userDto: CreateUserDto) {
    return await this.usersService.create(userDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginInterface> {
    const user = await this.usersService.findByLogin(loginUserDto);

    const token = this._createToken(user);

    return {
      ...token,
      data: user,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
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

  async verifyOtp({ phone, otpCode }: VerifyOtpDto) {
    const storedOtp = await this.redisClient.get(phone);

    if (storedOtp === otpCode) {
      return { message: 'OTP verified successfully' };
    } else {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }
  }

  private _createToken({ login }): CreateTokenInterface {
    const user: JwtPayload = { login };
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }
}
