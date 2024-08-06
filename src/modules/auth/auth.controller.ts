import { Body, Controller, Post } from '@nestjs/common';
import { SendMailDto, SendSmsDto, VerifyOtpDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-mail')
  public async sendEmail(@Body() sendMailDto: SendMailDto) {
    return await this.authService.sendMail(sendMailDto);
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
