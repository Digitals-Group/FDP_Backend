import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  create(body: Prisma.OrderCreateArgs) {
    return this.prisma.order.create(body);
  }

  findAll(body: Prisma.OrderFindManyArgs) {
    return {
      data: this.prisma.order.findMany(body),
      count: this.prisma.order.count(),
    };
  }

  findOne(body: Prisma.OrderFindUniqueArgs) {
    return this.prisma.order.findUnique(body);
  }

  update(body: Prisma.OrderUpdateArgs) {
    return this.prisma.order.update(body);
  }

  remove(id: string) {
    return this.prisma.order.delete({ where: { id } });
  }

  removeAll(body: Prisma.OrderDeleteManyArgs) {
    return this.prisma.order.deleteMany(body);
  }
}
