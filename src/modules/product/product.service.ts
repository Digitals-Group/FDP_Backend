import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(body: Prisma.ProductCreateArgs) {
    return this.prisma.product.create(body);
  }

  async findAll(body: Prisma.ProductFindManyArgs) {
    return {
      data: await this.prisma.product.findMany(body),
      count: await this.prisma.product.count(),
    };
  }

  findOne(body: Prisma.ProductFindUniqueArgs) {
    return this.prisma.product.findUnique(body);
  }

  update(body: Prisma.ProductUpdateArgs) {
    return this.prisma.product.update(body);
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }

  removeAll(body: Prisma.ProductDeleteManyArgs) {
    return this.prisma.product.deleteMany(body);
  }
}
