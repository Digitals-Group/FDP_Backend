import { User } from '@prisma/client';

export interface FormatLogin extends Partial<User> {
  login: string;
}

export interface findByPayloadInterface {
  login: string;
}

export interface CreateTokenInterface {
  expiresIn: string;
  Authorization: string;
}

export interface LoginInterface extends CreateTokenInterface {
  data: FormatLogin;
}
