import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { BookingStatus } from '../../booking/booking.status';

export class UpdateBookingStatusDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({ enum: [BookingStatus.APPROVED, BookingStatus.REJECTED] })
  @IsEnum([BookingStatus.APPROVED, BookingStatus.REJECTED])
  status: BookingStatus;
}
