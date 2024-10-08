import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';

@Module({
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, PrismaService],
})
export class ProductCategoryModule {}
