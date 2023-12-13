import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateAutoApprove {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({ description: '예약 자동승인 횟수' })
  @IsNumber()
  @Min(0)
  autoApprove: number;
}
