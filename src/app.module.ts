import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BannerModule } from './modules/banner/banner.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { BranchModule } from './modules/branch/branch.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
