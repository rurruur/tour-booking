import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../entity/booking.entity';
import { Seller } from '../entity/seller.entity';
import { SellerService } from '../seller/seller.service';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Seller])],
  controllers: [BookingController],
  providers: [BookingService, SellerService],
})
export class BookingModule {}
