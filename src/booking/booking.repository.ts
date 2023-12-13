import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entity/booking.entity';

@Injectable()
export class BookingRepository extends Repository<Booking> {
  constructor(@InjectRepository(Booking) private readonly repository: Repository<Booking>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findOrThrow(bookingId: string, options?: { email?: string; sellerId?: number }) {
    const booking = await this.findOneBy({ id: bookingId, ...options });
    if (!booking) {
      throw new BadRequestException('존재하지 않는 예약입니다.');
    }

    return booking;
  }
}
