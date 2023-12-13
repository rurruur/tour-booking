import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../entity/booking.entity';
import { Seller } from '../entity/seller.entity';
import { SellerRepository } from '../seller/seller.repository';
import { BookingController } from './booking.controller';
import { BookingRepository } from './booking.repository';
import { BookingService } from './booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Seller])],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository, SellerRepository],
})
export class BookingModule {}
