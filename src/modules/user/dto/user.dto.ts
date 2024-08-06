import { IsNotEmpty, IsString } from 'class-validator';

export class SendSmsDto {
  @IsNotEmpty()
  readonly phone: string;
}

export class VerifyOtpDto {
  @IsString()
  phone: string;

  @IsString()
  otpCode: string;
}
