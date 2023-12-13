import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum BookingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCEL = 'CANCEL',
}

/** 예약 상태에 따라 변경 가능한 상태 목록 */
const EditableStatus = {
  [BookingStatus.PENDING]: [BookingStatus.APPROVED, BookingStatus.REJECTED, BookingStatus.CANCEL],
  [BookingStatus.APPROVED]: [BookingStatus.CANCEL],
} as const;

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  sellerId: number;

  @Column({ type: 'varchar', length: 50, enum: BookingStatus })
  status: string = BookingStatus.PENDING;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'date' })
  date: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  /** 현재 예약 상태에서 입력받은 상태로 변경 가능한지 확인 */
  canTransitionTo(newStatus: BookingStatus) {
    if (EditableStatus[this.status] === undefined) {
      return false;
    }
    return EditableStatus[this.status].indexOf(newStatus) !== -1;
  }
}
