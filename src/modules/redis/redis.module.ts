// redis.module.ts
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { RedisProvider } from './redis.providers';

@Module({
  imports: [
    NestRedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL,
    }),
  ],
  exports: [NestRedisModule, RedisProvider],
  providers: [RedisProvider],
})
export class RedisModule {}
