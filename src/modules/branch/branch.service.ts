import { Body, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BranchService {
  constructor(private readonly prisma: PrismaService) {}
  create(createBranchDto: Prisma.BranchCreateArgs) {
    return this.prisma.branch.create(createBranchDto);
  }

  async findAll(body: Prisma.BranchFindManyArgs) {
    return {
      data: await this.prisma.branch.findMany(body),
      count: await this.prisma.branch.count(),
    };
  }

  findOne(body: Prisma.BranchFindUniqueArgs) {
    return this.prisma.branch.findUnique(body);
  }

  update(body: Prisma.BranchUpdateArgs) {
    return this.prisma.branch.update(body);
  }

  remove(id: string) {
    return this.prisma.branch.delete({ where: { id } });
  }

  deleteAll(@Body() body: Prisma.BranchDeleteManyArgs) {
    return this.prisma.branch.deleteMany(body);
  }
}
