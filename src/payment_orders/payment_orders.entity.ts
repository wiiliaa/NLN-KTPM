import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Status } from 'src/status/status.entity';
import { Payment } from '@src/payments/payments.entity';

@Entity()
export class PaymentOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  date: Date;

  @Column()
  pay_id: string;

  @OneToMany(() => Status, (status) => status.paymentOrders)
  status: Status;

  @OneToMany(() => Payment, (payment) => payment.paymentOrders)
  payment: Payment;

  @ManyToOne(() => User, (user) => user.paymentOrders)
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
