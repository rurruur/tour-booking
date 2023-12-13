import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from '../entity/seller.entity';
import { SellerController } from './seller.controller';
import { SellerRepository } from './seller.repository';
import { SellerService } from './seller.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seller])],
  controllers: [SellerController],
  providers: [SellerService, SellerRepository],
})
export class SellerModule {}
