import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CancelBookingDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
