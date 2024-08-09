import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from '../order/order.service';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService, PrismaService, OrderService],
})
export class OrderItemModule {}
