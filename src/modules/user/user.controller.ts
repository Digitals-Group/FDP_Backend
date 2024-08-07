import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: Prisma.UserCreateArgs) {
    return this.userService.create(body);
  }

  @Post('/list')
  findAll(@Body() body: Prisma.UserFindManyArgs) {
    return this.userService.findAll(body);
  }

  @Post('/read')
  findOne(@Body() body: Prisma.UserFindUniqueArgs) {
    return this.userService.findOne(body);
  }

  @Patch('/update')
  update(@Body() body: Prisma.UserUpdateArgs) {
    return this.userService.update(body);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }

  @Post('/delete')
  removeAll(@Body() body: Prisma.UserDeleteManyArgs) {
    return this.userService.removeAll(body);
  }
}
