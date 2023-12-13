import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingRepository } from '../booking/booking.repository';
import { BookingService } from '../booking/booking.service';
import { BookingStatus } from '../entity/booking.entity';
import { SellerRepository } from './seller.repository';

@Injectable()
export class SellerService {
  constructor(
    private readonly sellerRepository: SellerRepository,
    private readonly bookingRepository: BookingRepository,
    private readonly bookingService: BookingService,
  ) {}

  async getSellers() {
    return this.sellerRepository.getSellers();
  }

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
    const user = await this.sellerRepository.findOrThrow(userId);

    user.autoApprove = autoApprove;
    await this.sellerRepository.update({ id: userId }, { autoApprove });

    return user;
  }

  async updateOff(userId: number, offDate?: string[], offDay?: string[]) {
    const user = await this.sellerRepository.findOrThrow(userId);
    const off = Object.assign({}, { ...(offDate?.length && { offDate }), ...(offDay?.length && { offDay }) });

    await this.sellerRepository.update({ id: userId }, off);

    return { ...user, ...off };
  }

  async updateBookingStatus(sellerId: number, bookingId: number, status: BookingStatus) {
    const booking = await this.bookingRepository.findOrThrow(bookingId, { sellerId });

    return this.bookingService.updateBookingStatus(booking, status);
  }
}
