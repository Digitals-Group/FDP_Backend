import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  FormatLogin,
  findByPayloadInterface,
} from 'src/interfaces/auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { omit } from 'src/utils/object.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto, UpdatePasswordDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updatePassword(payload: UpdatePasswordDto, id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await bcrypt.compare(payload.old_password, user.password);
    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.prisma.user.update({
      where: { id },
      data: { password: await bcrypt.hash(payload.new_password, 10) },
    });
  }

  async findByLogin({ login, password }: LoginUserDto): Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({
      where: { login },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    return omit(user, ['password']);
  }

  async findByPayload({ login }: findByPayloadInterface): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { login },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const userInDb = await this.prisma.user.findFirst({
      where: { login: createUserDto.login },
    });
    if (userInDb) {
      throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        role: 'CLIENT' as const,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
