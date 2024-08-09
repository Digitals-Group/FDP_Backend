import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BannerModule } from './modules/banner/banner.module';
import { BranchModule } from './modules/branch/branch.module';
import { ContactModule } from './modules/contact/contact.module';
import { DeliveryPriceModule } from './modules/delivery-price/delivery-price.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { OrderModule } from './modules/order/order.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { ProductModule } from './modules/product/product.module';
import { RedisModule } from './modules/redis/redis.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RedisModule,
    BannerModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MailerModule,
    ProductCategoryModule,
    BranchModule,
    DeliveryPriceModule,
    ProductModule,
    ContactModule,
    OrderModule,
    OrderItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
