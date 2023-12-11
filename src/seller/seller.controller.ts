import { Body, Controller, Post } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  async create(@Body() { email, name }: CreateSellerDto) {
    return this.sellerService.create(email, name);
  }
}
