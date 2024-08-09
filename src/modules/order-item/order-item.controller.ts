import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OrderItemService } from './order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() body: Prisma.OrderItemCreateArgs) {
    return this.orderItemService.create(body);
  }

  @Post('/list')
  findAll(@Body() body: Prisma.OrderItemFindManyArgs) {
    return this.orderItemService.findAll(body);
  }

  @Post('/read')
  findOne(@Body() body: Prisma.OrderItemFindUniqueArgs) {
    return this.orderItemService.findOne(body);
  }

  @Patch('/update')
  update(@Body() body: Prisma.OrderItemUpdateArgs) {
    return this.orderItemService.update(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(id);
  }

  @Post('/delete')
  removeAll(@Body() body: Prisma.OrderItemDeleteManyArgs) {
    return this.orderItemService.removeAll(body);
  }
}
