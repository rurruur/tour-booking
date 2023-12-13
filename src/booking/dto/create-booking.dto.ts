import { IsEmail, IsNumber, IsString, Length, Validate } from 'class-validator';
import { IsDateFormatValid } from '../../validation/off-date.validation';

export class CreateBookingDto {
  @IsNumber()
  sellerId: number;

  @Validate(IsDateFormatValid)
  date: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 50)
  name: string;
}
