import { User } from '@prisma/client';

export enum OtpType {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

export interface findByPayloadInterface {
  login: string;
}

export interface CreateTokenInterface {
  expiresIn: string;
  Authorization: string;
}

export interface LoginInterface extends CreateTokenInterface {
  data: User;
}
