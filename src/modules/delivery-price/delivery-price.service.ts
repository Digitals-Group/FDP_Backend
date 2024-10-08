import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeliveryPriceService {
  constructor(private readonly prisma: PrismaService) {}
  create(body: Prisma.DeliveryPriceCreateArgs) {
    return this.prisma.deliveryPrice.create(body);
  }

  async findAll(body: Prisma.DeliveryPriceFindManyArgs) {
    return {
      data: await this.prisma.deliveryPrice.findMany(body),
      activeCount: await this.prisma.deliveryPrice.count({
        where: { ...body.where, active: true },
      }),
      inActiveCount: await this.prisma.deliveryPrice.count({
        where: { ...body.where, active: false },
      }),
    };
  }

  findOne(body: Prisma.DeliveryPriceFindUniqueArgs) {
    return this.prisma.deliveryPrice.findUnique(body);
  }

  update(body: Prisma.DeliveryPriceUpdateArgs) {
    return this.prisma.deliveryPrice.update(body);
  }

  remove(id: string) {
    return this.prisma.deliveryPrice.delete({ where: { id } });
  }

  removeAll(body: Prisma.DeliveryPriceDeleteManyArgs) {
    return this.prisma.deliveryPrice.deleteMany(body);
  }
}
