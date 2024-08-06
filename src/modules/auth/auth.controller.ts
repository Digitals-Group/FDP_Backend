import { Body, Controller, Post } from '@nestjs/common';
import { SendSmsDto, VerifyOtpDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-sms')
  public async sendSms(@Body() sendSmsDto: SendSmsDto) {
    return await this.authService.sendSms(sendSmsDto);
  }

  @Post('verify-otp')
  public async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return await this.authService.verifyOtp(verifyOtpDto);
  }
}
