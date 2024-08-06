import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/user.dto';
import { UserService } from './user.service';

interface CustomRequest<T> extends Request {
  user?: T;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('update/password')
  public async updatePassword(
    @Request() req: CustomRequest<User>,
    @Body()
    updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.userService.updatePassword(updatePasswordDto, req.user.id);
    return {
      message: 'password_update_success',
    };
  }
}
