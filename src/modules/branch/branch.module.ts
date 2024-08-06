import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';

@Module({
  controllers: [BranchController],
  providers: [BranchService, PrismaService],
})
export class BranchModule {}
