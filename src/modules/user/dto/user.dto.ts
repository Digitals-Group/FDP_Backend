import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  readonly login: string;

  @IsNotEmpty()
  readonly password: string;
}

export class SendSmsDto {
  @IsNotEmpty()
  readonly phone: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  new_password: string;

  @IsNotEmpty()
  old_password: string;
}

export class VerifyOtpDto {
  @IsString()
  phone: string;

  @IsString()
  otpCode: string;
}
