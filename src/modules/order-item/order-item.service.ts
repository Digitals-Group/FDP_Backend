import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  create(body: Prisma.OrderItemCreateArgs) {
    return this.prisma.orderItem.create(body);
  }

  findAll(body: Prisma.OrderItemFindManyArgs) {
    return this.prisma.orderItem.findMany(body);
  }

  findOne(body: Prisma.OrderItemFindUniqueArgs) {
    return this.prisma.orderItem.findUnique(body);
  }

  update(body: Prisma.OrderItemUpdateArgs) {
    return this.prisma.orderItem.update(body);
  }

  remove(id: string) {
    return this.prisma.orderItem.delete({ where: { id } });
  }

  removeAll(body: Prisma.OrderItemDeleteManyArgs) {
    return this.prisma.orderItem.deleteMany(body);
  }
}
