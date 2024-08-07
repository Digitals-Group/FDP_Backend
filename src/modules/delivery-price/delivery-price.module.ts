import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeliveryPriceController } from './delivery-price.controller';
import { DeliveryPriceService } from './delivery-price.service';

@Module({
  controllers: [DeliveryPriceController],
  providers: [DeliveryPriceService, PrismaService],
})
export class DeliveryPriceModule {}
