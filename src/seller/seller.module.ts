import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingRepository } from '../booking/booking.repository';
import { BookingService } from '../booking/booking.service';
import { CacheService } from '../cache.service';
import { Booking } from '../entity/booking.entity';
import { Seller } from '../entity/seller.entity';
import { SellerController } from './seller.controller';
import { SellerRepository } from './seller.repository';
import { SellerService } from './seller.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seller, Booking])],
  controllers: [SellerController],
  providers: [SellerService, SellerRepository, BookingService, BookingRepository, CacheService],
})
export class SellerModule {}
