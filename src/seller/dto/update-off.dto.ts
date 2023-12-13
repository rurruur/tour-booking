import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsOptional, Validate } from 'class-validator';
import { OffDay } from '../../entity/seller.entity';
import { IsDateFormatValid } from '../../validation/off-date.validation';

export class UpdateOff {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({ description: '휴무일', format: 'YYYY-MM-DD' })
  @IsArray()
  @IsOptional()
  @Validate(IsDateFormatValid)
  offDate?: string[];

  @ApiProperty({ description: '휴무요일', enum: OffDay })
  @IsArray()
  @IsOptional()
  @IsEnum(OffDay, { each: true })
  offDay?: string[];
}
