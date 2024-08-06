import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BannerService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBannerDto: Prisma.BannerCreateArgs) {
    return this.prisma.banner.create(createBannerDto);
  }

  findAll(body: Prisma.BannerFindManyArgs) {
    return {
      data: this.prisma.banner.findMany(body),
      count: this.prisma.banner.count(),
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
