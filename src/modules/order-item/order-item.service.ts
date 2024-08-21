import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  create(body: Prisma.OrderItemCreateArgs) {
    return this.prisma.orderItem.create(body);
  }

  async findAll(body: Prisma.OrderItemFindManyArgs) {
    return {
      data: await this.prisma.orderItem.findMany(body),
      activeCount: await this.prisma.orderItem.count({
        where: { active: true },
      }),
      inActiveCount: await this.prisma.orderItem.count({
        where: { active: false },
      }),
    };
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
