import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OtpType } from 'src/interfaces/auth.interface';

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
  @IsEnum(OtpType)
  type: OtpType;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  otpCode: string;
}
