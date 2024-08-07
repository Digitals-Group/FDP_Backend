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
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() body: Prisma.ProductCreateArgs) {
    return this.productService.create(body);
  }

  @Post('/list')
  findAll(@Body() body: Prisma.ProductFindManyArgs) {
    return this.productService.findAll(body);
  }

  @Post('/read')
  findOne(@Body() body: Prisma.ProductFindUniqueArgs) {
    return this.productService.findOne(body);
  }

  @Patch('/update')
  update(@Body() body: Prisma.ProductUpdateArgs) {
    return this.productService.update(body);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productService.remove(id);
  }

  @Post('/delete')
  removeAll(@Body() body: Prisma.ProductDeleteManyArgs) {
    return this.productService.removeAll(body);
  }
}
