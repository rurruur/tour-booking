import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateAutoApprove } from './dto/update-auto-approve.dto';
import { UpdateOff } from './dto/update-off.dto';
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

  @Patch('off')
  async updateOff(@Body() { userId, offDate, offDay }: UpdateOff) {
    return this.sellerService.updateOff(userId, offDate, offDay);
  }
}
