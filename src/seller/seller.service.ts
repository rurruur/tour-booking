import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from '../entity/seller.entity';

@Injectable()
export class SellerService {
  constructor(@InjectRepository(Seller) private readonly sellerRepository: Repository<Seller>) {}

  async create(email: string, name: string) {
    const foundUser = await this.sellerRepository.findOneBy({ email });
    if (foundUser) {
      throw new BadRequestException('이미 가입된 이메일입니다.');
    }

    const user = this.sellerRepository.create({ email, name });
    await this.sellerRepository.insert(user);

    return user;
  }

  async updateAutoApprove(userId: number, autoApprove: number) {
    const user = await this.sellerRepository.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }

    user.autoApprove = autoApprove;
    await this.sellerRepository.update({ id: userId }, { autoApprove });

    return user;
  }
}
