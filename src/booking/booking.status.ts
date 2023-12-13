export enum BookingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCEL = 'CANCEL',
}

export const ActiveBookingStatus = [BookingStatus.PENDING, BookingStatus.APPROVED];
