import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateActiveDto {
  @ApiProperty()
  @IsNumber()
  sellerId: number;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
