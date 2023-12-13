import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum OffDay {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'int', default: 5 })
  autoApprove: number;

  @Column({ type: 'json', nullable: true, default: null })
  offDate: string[];

  @Column({ type: 'json', nullable: true, default: null })
  offDay: string[];

  // TODO: 활성화/비활성화 기능 추가

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  /** 입력된 날짜가 휴무일인지 확인 */
  isOffDate(date: string): boolean {
    if (!this.offDate?.length) {
      return false;
    }
    return this.offDate.includes(date);
  }

  /** 입력된 요일이 휴무인지 확인 */
  isOffDay(day: string): boolean {
    if (!this.offDay?.length) {
      return false;
    }
    return this.offDay.includes(day);
  }
}
