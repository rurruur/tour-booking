import { IsEmail, IsString, Length } from 'class-validator';

export class CreateSellerDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 50)
  name: string;
}
