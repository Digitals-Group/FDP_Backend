import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BannerService {
  constructor(private readonly prisma: PrismaService) {}

  create(body: Prisma.BannerCreateArgs) {
    return this.prisma.banner.create(body);
  }

  async findAll(body: Prisma.BannerFindManyArgs) {
    return {
      data: await this.prisma.banner.findMany(body),
      activeCount: await this.prisma.banner.count({
        where: { active: true, ...body.where },
      }),
      inActiveCount: await this.prisma.banner.count({
        where: { active: false, ...body.where },
      }),
    };
  }

  findOne(body: Prisma.BannerFindUniqueArgs) {
    return this.prisma.banner.findUnique(body);
  }

  update(body: Prisma.BannerUpdateArgs) {
    return this.prisma.banner.update(body);
  }

  remove(id: string) {
    return this.prisma.banner.delete({ where: { id } });
  }

  removeAll(body: Prisma.BannerDeleteManyArgs) {
    return this.prisma.banner.deleteMany(body);
  }
}
