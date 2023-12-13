import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from '../entity/seller.entity';

@Injectable()
export class SellerRepository extends Repository<Seller> {
  constructor(@InjectRepository(Seller) private readonly repository: Repository<Seller>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findOrThrow(userId: number) {
    const user = await this.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }

    return user;
  }

  async getSellers() {
    return this.find();
  }
}
