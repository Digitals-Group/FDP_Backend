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
import { OrderService } from './order.service';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() body: Prisma.OrderCreateArgs) {
    return this.orderService.create(body);
  }

  @Post('/list')
  findAll(@Body() body: Prisma.OrderFindManyArgs) {
    return this.orderService.findAll(body);
  }

  @Post('/read')
  findOne(@Body() body: Prisma.OrderFindUniqueArgs) {
    return this.orderService.findOne(body);
  }

  @Patch('/update')
  update(@Body() body: Prisma.OrderUpdateArgs) {
    return this.orderService.update(body);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.orderService.remove(id);
  }

  @Post('/delete')
  removeAll(@Body() body: Prisma.OrderDeleteManyArgs) {
    return this.orderService.removeAll(body);
  }
}
