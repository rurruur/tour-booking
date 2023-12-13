import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
@ApiTags('예약')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Cron('0 0 0 * * *')
  async cancelPendingBookings() {
    await this.bookingService.cancelPendingBookings();
  }

  @Get()
  @ApiOperation({ summary: '월 단위 예약 가능 일자 확인' })
  async getAvailableSlot(@Query('year') year: number, @Query('month') month: number) {
    return this.bookingService.getAvailableSlot(year, month);
  }

  @Post()
  @ApiOperation({ summary: '예약 생성' })
  async createBooking(@Body() { sellerId, date, email, name }: CreateBookingDto) {
    return this.bookingService.createBooking(sellerId, date, email, name);
  }

  @Post(':bookingId/cancel')
  @ApiOperation({ summary: '예약 취소' })
  async cancelBooking(@Param('bookingId') bookingId: string, @Body() { email }: CancelBookingDto) {
    return this.bookingService.cancelBooking(bookingId, email);
  }
}
