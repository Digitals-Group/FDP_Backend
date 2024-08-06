import { $Enums, User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  isAllowedCash: boolean;
  role: $Enums.Role;
  createdAt: Date;
  updatedAt: Date;
}
