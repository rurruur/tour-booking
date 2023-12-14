import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { BookingModule } from './booking/booking.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 5001,
      username: 'nakkim',
      password: 'nakkim@test',
      database: 'booking_dev',
      entities: [__dirname + '/entity/*.entity{.ts,.js}'],
      logging: true,
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ScheduleModule.forRoot(),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: async () => ({
        store: (await redisStore({
          url: 'redis://localhost:6379',
        })) as unknown as CacheStore,
        host: 'localhost',
        port: 6379,
      }),
    }),
    SellerModule,
    BookingModule,
  ],
})
export class AppModule {}
