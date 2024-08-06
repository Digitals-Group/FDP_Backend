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
import { DeliveryPriceService } from './delivery-price.service';

@Controller('delivery-price')
export class DeliveryPriceController {
  constructor(private readonly deliveryPriceService: DeliveryPriceService) {}

  @Post()
  create(@Body() body: Prisma.DeliveryPriceCreateArgs) {
    return this.deliveryPriceService.create(body);
  }

  @Post('list')
  findAll(@Body() body: Prisma.DeliveryPriceFindManyArgs) {
    return this.deliveryPriceService.findAll(body);
  }

  @Post('read')
  findOne(@Body() body: Prisma.DeliveryPriceFindUniqueArgs) {
    return this.deliveryPriceService.findOne(body);
  }

  @Patch('update')
  update(@Body() body: Prisma.DeliveryPriceUpdateArgs) {
    return this.deliveryPriceService.update(body);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deliveryPriceService.remove(id);
  }
}
