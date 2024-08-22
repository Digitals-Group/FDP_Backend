import { Body, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  create(body: Prisma.ContactCreateArgs) {
    return this.prisma.contact.create(body);
  }

  async findAll(body: Prisma.ContactFindManyArgs) {
    return {
      data: await this.prisma.contact.findMany(body),
      activeCount: await this.prisma.contact.count({
        where: { active: true, ...body.where },
      }),
      inActiveCount: await this.prisma.contact.count({
        where: { active: false, ...body.where },
      }),
    };
  }

  findOne(body: Prisma.ContactFindUniqueArgs) {
    return this.prisma.contact.findUnique(body);
  }

  update(body: Prisma.ContactUpdateArgs) {
    return this.prisma.contact.update(body);
  }

  remove(id: string) {
    return this.prisma.contact.delete({ where: { id } });
  }

  removeAll(@Body() body: Prisma.ContactDeleteManyArgs) {
    return this.prisma.contact.deleteMany(body);
  }
}
