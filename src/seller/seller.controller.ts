import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CacheService } from '../cache.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateActiveDto } from './dto/update-active.dto';
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

    await this.cacheService.deleleteByPrefix('/booking/slot');

    return user;
  }

  @Patch('auto-approve')
  @ApiOperation({ summary: '예약 자동승인 횟수 수정' })
  async updateAutoApprove(@Body() { sellerId, autoApprove }: UpdateAutoApprove) {
    return this.sellerService.updateAutoApprove(sellerId, autoApprove);
  }

  @Patch('off')
  @ApiOperation({ summary: '휴무일 수정' })
  async updateOff(@Body() { sellerId, offDate, offDay }: UpdateOff) {
    await this.sellerService.updateOff(sellerId, offDate, offDay);
    await this.cacheService.deleleteByPrefix('/booking/slot');

    return true;
  }

  @Patch('booking/:bookingId')
  @ApiOperation({ summary: '투어 예약 신청 수락/거절' })
  async updateBookingStatus(
    @Param('bookingId') bookingId: string,
    @Body() { sellerId, status }: UpdateBookingStatusDto,
  ) {
    return this.sellerService.updateBookingStatus(sellerId, bookingId, status);
  }

  @Patch('activate')
  @ApiOperation({ summary: '판매자 활성화 여부 수정' })
  async updateActivationStatus(@Body() { sellerId, isActive }: UpdateActiveDto) {
    await this.sellerService.updateActivationStatus(sellerId, isActive);
    await this.cacheService.deleleteByPrefix('/booking/slot');

    return true;
  }

  @Get(':sellerId')
  @ApiOperation({ summary: '판매자 상세 조회' })
  async getSeller(@Param('sellerId') sellerId: number) {
    return this.sellerService.getSeller(sellerId);
  }
}
