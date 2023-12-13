import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async getAvailableSlot(@Query('year') year: number, @Query('month') month: number) {
    return this.bookingService.getAvailableSlot(year, month);
  }

  @Post()
  async createBooking(@Body() { sellerId, date, email, name }: CreateBookingDto) {
    return this.bookingService.createBooking(sellerId, date, email, name);
  }

  @Post('cancel')
  async cancelBooking(@Body() { bookingId, email }: CancelBookingDto) {
    return this.bookingService.cancelBooking(bookingId, email);
  }
}
