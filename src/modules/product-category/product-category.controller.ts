import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductCategoryService } from './product-category.service';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  create(@Body() body: Prisma.ProductCategoryCreateArgs) {
    return this.productCategoryService.create(body);
  }

  @Post('/list')
  findAll(@Body() body: Prisma.ProductCategoryFindManyArgs) {
    return this.productCategoryService.findAll(body);
  }

  @Post('/read')
  findOne(@Body() body: Prisma.ProductCategoryFindUniqueArgs) {
    return this.productCategoryService.findOne(body);
  }

  @Patch('/update')
  update(@Body() body: Prisma.ProductCategoryUpdateArgs) {
    return this.productCategoryService.update(body);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productCategoryService.remove(id);
  }

  @Post('/delete')
  removeAll(@Body() body: Prisma.ProductCategoryDeleteManyArgs) {
    return this.productCategoryService.removeAll(body);
  }
}
