import { IsNumber, Min } from 'class-validator';

export class UpdateAutoApprove {
  @IsNumber()
  userId: number;

  @IsNumber()
  @Min(0)
  autoApprove: number;
}
