import { IsEmail } from 'class-validator';

export class CancelBookingDto {
  @IsEmail()
  email: string;
}
