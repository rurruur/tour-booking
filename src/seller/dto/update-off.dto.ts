import { IsArray, IsEnum, IsNumber, IsOptional, Validate } from 'class-validator';
import { OffDay } from '../../entity/seller.entity';
import { IsDateFormatValid } from '../../validation/off-date.validation';

export class UpdateOff {
  @IsNumber()
  userId: number;

  @IsArray()
  @IsOptional()
  @Validate(IsDateFormatValid)
  offDate?: string[];

  @IsArray()
  @IsOptional()
  @IsEnum(OffDay, { each: true })
  offDay?: string[];
}
