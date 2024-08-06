import { $Enums, Prisma } from '@prisma/client';

export class CreateUserDto
  implements Omit<Prisma.UserCreateInput, 'id' | 'createdAt' | 'updatedAt'>
{
  fullName: string;
  phone?: string;
  email?: string;
  isAllowedCash?: boolean;
  role?: $Enums.Role;
}
