import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    SellerModule,
    BookingModule,
  ],
})
export class AppModule {}
