import { IsEmail, IsNumber } from 'class-validator';

export class CancelBookingDto {
  @IsNumber()
  bookingId: number;

  @IsEmail()
  email: string;
}
