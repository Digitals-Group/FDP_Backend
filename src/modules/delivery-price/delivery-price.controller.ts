import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeliveryPriceService } from './delivery-price.service';

@Controller('delivery-price')
@UseGuards(JwtAuthGuard)
export class DeliveryPriceController {
  constructor(private readonly deliveryPriceService: DeliveryPriceService) {}

  @Post()
  create(@Body() body: Prisma.DeliveryPriceCreateArgs) {
    return this.deliveryPriceService.create(body);
  }

  @Post('/list')
  findAll(@Body() body: Prisma.DeliveryPriceFindManyArgs) {
    return this.deliveryPriceService.findAll(body);
  }

  @Post('/read')
  findOne(@Body() body: Prisma.DeliveryPriceFindUniqueArgs) {
    return this.deliveryPriceService.findOne(body);
  }

  @Patch('/update')
  update(@Body() body: Prisma.DeliveryPriceUpdateArgs) {
    return this.deliveryPriceService.update(body);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deliveryPriceService.remove(id);
  }

  @Post('/delete')
  removeAll(@Body() body: Prisma.DeliveryPriceDeleteManyArgs) {
    return this.deliveryPriceService.removeAll(body);
  }
}
