import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
