import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OtpType } from 'src/interfaces/auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from '../auth/jwt.strategy';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(body: Prisma.UserCreateArgs) {
    return this.prisma.user.create(body);
  }

  async findAll(body: Prisma.UserFindManyArgs) {
    return {
      data: await this.prisma.user.findMany(body),
      count: await this.prisma.user.count(),
    };
  }

  findOne(body: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(body);
  }

  findByPayload({ phone, email, type }: JwtPayload) {
    if (type === OtpType.EMAIL) {
      return this.prisma.user.findUnique({ where: { email } });
    }
    if (type === OtpType.PHONE) {
      return this.prisma.user.findUnique({ where: { phone } });
    }
  }

  update(body: Prisma.UserUpdateArgs) {
    return this.prisma.user.update(body);
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  removeAll(body: Prisma.UserDeleteManyArgs) {
    return this.prisma.user.deleteMany(body);
  }
}
