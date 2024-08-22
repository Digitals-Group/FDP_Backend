import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  create(body: Prisma.OrderCreateArgs) {
    return this.prisma.order.create(body);
  }

  async findAll(body: Prisma.OrderFindManyArgs) {
    return {
      data: await this.prisma.order.findMany(body),
      activeCount: await this.prisma.order.count({
        where: { active: true, ...body.where },
      }),
      inActiveCount: await this.prisma.order.count({
        where: { active: false, ...body.where },
      }),
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
