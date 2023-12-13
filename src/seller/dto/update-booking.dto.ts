import { IsEnum, IsNumber } from 'class-validator';
import { BookingStatus } from '../../entity/booking.entity';

export class UpdateBookingStatusDto {
  @IsNumber()
  userId: number;

  @IsEnum([BookingStatus.APPROVED, BookingStatus.REJECTED])
  status: BookingStatus;
}
