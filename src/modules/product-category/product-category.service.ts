import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(body: Prisma.ProductCategoryCreateArgs) {
    return this.prisma.productCategory.create(body);
  }

  async findAll(body: Prisma.ProductCategoryFindManyArgs) {
    return {
      data: await this.prisma.productCategory.findMany(body),
      activeCount: await this.prisma.productCategory.count({
        where: { ...body.where, active: true },
      }),
      inActiveCount: await this.prisma.productCategory.count({
        where: { ...body.where, active: false },
      }),
    };
  }

  findOne(body: Prisma.ProductCategoryFindUniqueArgs) {
    return this.prisma.productCategory.findUnique(body);
  }

  update(body: Prisma.ProductCategoryUpdateArgs) {
    return this.prisma.productCategory.update(body);
  }

  remove(id: string) {
    return this.prisma.productCategory.delete({
      where: { id },
    });
  }

  removeAll(body: Prisma.ProductCategoryDeleteManyArgs) {
    return this.prisma.productCategory.deleteMany(body);
  }
}
