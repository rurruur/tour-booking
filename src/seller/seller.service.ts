import { BadRequestException, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { In, MoreThan } from 'typeorm';
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

  /**
   * 휴무로 지정한 날에
   * - 대기중인 예약이 있을 경우 취소 처리됨
   * - 확정된 예약이 있을 경우 휴무 지정 불가
   * @param offDate YYYY-MM-DD 형식의 날짜 배열
   * @param offDay MON, TUE, WED, THU, FRI, SAT, SUN 형식의 요일 배열
   */
  async updateOff(userId: number, offDate?: string[], offDay?: string[]) {
    if (offDate?.length) {
      const today = dayjs().format('YYYY-MM-DD');
      const isAfterToday = offDate.every((date) => dayjs(date).isAfter(today));
      if (!isAfterToday) {
        throw new BadRequestException('휴무일은 오늘 이후로만 지정 가능합니다.');
      }
    }

    const user = await this.sellerRepository.findOrThrow(userId);
    Object.assign(user, { ...(offDate?.length && { offDate }), ...(offDay?.length && { offDay }) });

    const bookings = await this.bookingRepository.findBy({
      sellerId: userId,
      date: MoreThan(dayjs().format('YYYY-MM-DD')),
      status: In([BookingStatus.PENDING, BookingStatus.APPROVED]),
    });

    const approvedBookings = bookings.filter((b) => b.status === BookingStatus.APPROVED);
    if (approvedBookings.some((b) => user.isOff(b.date))) {
      throw new BadRequestException('확정된 예약이 있는 날은 휴무일로 지정할 수 없습니다.');
    }

    const pendingBookings = bookings.filter((b) => b.status === BookingStatus.PENDING);
    pendingBookings.forEach((b) => {
      if (user.isOff(b.date)) {
        this.bookingService.updateBookingStatus(b, BookingStatus.REJECTED);
      }
    });

    await this.sellerRepository.update({ id: userId }, user);

    return user;
  }

  async updateBookingStatus(sellerId: number, bookingId: string, status: BookingStatus) {
    const booking = await this.bookingRepository.findOrThrow(bookingId, { sellerId });

    return this.bookingService.updateBookingStatus(booking, status);
  }
}
