import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { Booking } from '../entity/booking.entity';
import { Seller } from '../entity/seller.entity';
import { getDayOfWeek } from '../lib/date';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Seller) private readonly sellerRepository: Repository<Seller>,
  ) {}

  // TODO: 지난 날짜는 조회 불가능
  async getAvailableSlot(year: number, month: number) {
    const targetDate = dayjs()
      .set('year', year)
      .set('month', month - 1)
      .set('date', 1);
    const daysInMonth = targetDate.daysInMonth();
    const slots = new Map<string, { id: number; name: string }[]>();
    for (let i = 0; i < daysInMonth; i++) {
      slots.set(targetDate.add(i, 'day').format('YYYY-MM-DD'), []);
    }

    const sellers = await this.sellerRepository.find();
    for (const seller of sellers) {
      for (let i = 0; i < daysInMonth; i++) {
        const currentDate = targetDate.add(i, 'day');
        const formattedDate = currentDate.format('YYYY-MM-DD');

        if (!seller.isOffDate(formattedDate) && !seller.isOffDay(getDayOfWeek(formattedDate))) {
          slots.get(formattedDate).push({ id: seller.id, name: seller.name });
        }
      }
    }

    return Array.from(slots, ([date, sellers]) => ({ date, sellers }));
  }
}
