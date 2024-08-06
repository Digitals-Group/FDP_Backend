import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendSmsDto {
  @IsNotEmpty()
  readonly phone: string;
}

export class SendMailDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class VerifyOtpDto {
  @IsString()
  phone: string;

  @IsString()
  otpCode: string;
}
