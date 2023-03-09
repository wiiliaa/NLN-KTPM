import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
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

<<<<<<< HEAD
  @OneToOne(()=>Order)
  order:Order;

  @ManyToOne(() => User, (user) => user.paymentOrder)
  user: User;


  @OneToOne(()=>Status)
  status:Status;


=======
>>>>>>> tthao123/feature/update-order
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
