import { Controller, Get, Query } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async getAvailableSlot(@Query('year') year: number, @Query('month') month: number) {
    return this.bookingService.getAvailableSlot(year, month);
  }
}
