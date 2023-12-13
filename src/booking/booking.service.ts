import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import dayjs from 'dayjs';
import { In } from 'typeorm';
import { Booking } from '../entity/booking.entity';
import { getDiffFromToday } from '../lib/date';
import { SellerRepository } from '../seller/seller.repository';
import { BookingRepository } from './booking.repository';
import { ActiveBookingStatus, BookingStatus } from './booking.status';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    private readonly sellerRepository: SellerRepository,
    private readonly bookingRepository: BookingRepository,
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

    const sellers = await this.sellerRepository.getSellers();
    for (const seller of sellers) {
      for (let i = 0; i < daysInMonth; i++) {
        const currentDate = targetDate.add(i, 'day');
        const formattedDate = currentDate.format('YYYY-MM-DD');

        if (!seller.isOff(formattedDate)) {
          slots.get(formattedDate).push({ id: seller.id, name: seller.name });
        }
      }
    }

    return Array.from(slots, ([date, sellers]) => ({ date, sellers }));
  }

  /**
   * 오늘 이전 날짜는 예약 불가능
   * 신청한 이메일로 동일 날짜에 예약한 내역이 있을 경우 오류 발생
   */
  async createBooking(sellerId: number, date: string, email: string, name: string) {
    if (dayjs(date).isBefore(dayjs(), 'day')) {
      throw new BadRequestException('오늘 이전 날짜는 예약할 수 없습니다.');
    }

    const prevBooking = await this.bookingRepository.findOneBy({ email, date, status: In(ActiveBookingStatus) });
    if (prevBooking) {
      throw new BadRequestException('이미 예약된 시간입니다.');
    }

    const seller = await this.sellerRepository.findOrThrow(sellerId);
    if (seller.isOff(date)) {
      throw new BadRequestException('판매자의 휴무일입니다.');
    }

    const newBooking = this.bookingRepository.create({ sellerId, date, email, name });
    const sellerBookings = await this.bookingRepository.findBy({ sellerId, date, status: In(ActiveBookingStatus) });
    if (sellerBookings.length < seller.autoApprove) {
      newBooking.status = BookingStatus.APPROVED;
    }

    await this.bookingRepository.insert(newBooking);

    return newBooking.id;
  }

  async cancelBooking(bookingId: string, email: string) {
    const booking = await this.bookingRepository.findOrThrow(bookingId, { email });

    return this.updateBookingStatus(booking, BookingStatus.CANCEL);
  }

  /**
   * 취소: 예약일 3일 전까지 가능
   * 수락/거절: 여행일 하루 전까지만 가능
   */
  async updateBookingStatus(booking: Booking, newStatus: BookingStatus) {
    if (!booking.canTransitionTo(newStatus)) {
      throw new BadRequestException(`${booking.status} 상태에서는 ${newStatus}로 변경할 수 없습니다.}`);
    }

    if (newStatus === BookingStatus.CANCEL && getDiffFromToday(booking.date) < 3) {
      throw new BadRequestException('취소는 예약일로부터 3일 전까지만 가능합니다.');
    }
    if (getDiffFromToday(booking.date) < 1) {
      throw new BadRequestException('예약 상태 변경은 예약일로부터 1일 전까지만 가능합니다.');
    }

    await this.bookingRepository.update({ id: booking.id }, { status: newStatus });

    return true;
  }

  /** 매일 자정에 대기중인 예약을 취소 처리 */
  async cancelPendingBookings() {
    const pendingBookings = (
      await this.bookingRepository.findBy({
        date: dayjs().format('YYYY-MM-DD'),
        status: BookingStatus.PENDING,
      })
    ).map((b) => b.id);

    await this.bookingRepository.update({ id: In(pendingBookings) }, { status: BookingStatus.REJECTED });

    this.logger.log(`대기예약 자동 취소: ${pendingBookings}`);
  }
}
