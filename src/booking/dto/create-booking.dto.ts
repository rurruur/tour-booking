import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length, Validate } from 'class-validator';
import { IsDateFormatValid } from '../../validation/off-date.validation';

export class CreateBookingDto {
  @ApiProperty()
  @IsNumber()
  sellerId: number;

  @ApiProperty({ format: 'YYYY-MM-DD' })
  @Validate(IsDateFormatValid)
  date: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(1, 50)
  name: string;
}
