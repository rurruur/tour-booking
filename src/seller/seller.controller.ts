import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateAutoApprove } from './dto/update-auto-approve.dto';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  async create(@Body() { email, name }: CreateSellerDto) {
    return this.sellerService.create(email, name);
  }

  @Patch('auto-approve')
  async updateAutoApprove(@Body() { userId, autoApprove }: UpdateAutoApprove) {
    return this.sellerService.updateAutoApprove(userId, autoApprove);
  }
}
