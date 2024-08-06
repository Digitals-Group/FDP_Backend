import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto, SendSmsDto, VerifyOtpDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('send-sms')
  public async sendSms(@Body() sendSmsDto: SendSmsDto) {
    return await this.authService.sendSms(sendSmsDto);
  }

  @Post('verify-otp')
  public async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return await this.authService.verifyOtp(verifyOtpDto);
  }
}
