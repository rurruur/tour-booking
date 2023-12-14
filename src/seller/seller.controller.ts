import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CacheService } from '../cache.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateAutoApprove } from './dto/update-auto-approve.dto';
import { UpdateBookingStatusDto } from './dto/update-booking.dto';
import { UpdateOff } from './dto/update-off.dto';
import { SellerService } from './seller.service';

@Controller('seller')
@ApiTags('판매자')
export class SellerController {
  constructor(private readonly sellerService: SellerService, private readonly cacheService: CacheService) {}

  @Get()
  @ApiOperation({ summary: '판매자 목록 조회' })
  async getSellers() {
    return this.sellerService.getSellers();
  }

  @Post()
  @ApiOperation({ summary: '판매자 등록' })
  async create(@Body() { email, name }: CreateSellerDto) {
    const user = await this.sellerService.create(email, name);

    await this.cacheService.deleleteByPrefix('/booking');

    return user;
  }

  @Patch('auto-approve')
  @ApiOperation({ summary: '예약 자동승인 횟수 수정' })
  async updateAutoApprove(@Body() { userId, autoApprove }: UpdateAutoApprove) {
    return this.sellerService.updateAutoApprove(userId, autoApprove);
  }

  @Patch('off')
  @ApiOperation({ summary: '휴무일 수정' })
  async updateOff(@Body() { userId, offDate, offDay }: UpdateOff) {
    await this.sellerService.updateOff(userId, offDate, offDay);

    await this.cacheService.deleleteByPrefix('/booking');

    return true;
  }

  @Patch('booking/:bookingId')
  @ApiOperation({ summary: '투어 예약 신청 수락/거절' })
  async updateBookingStatus(@Param('bookingId') bookingId: string, @Body() { userId, status }: UpdateBookingStatusDto) {
    return this.sellerService.updateBookingStatus(userId, bookingId, status);
  }
}
