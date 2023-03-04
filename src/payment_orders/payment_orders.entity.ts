import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Payment } from "src/payments/payments.entity";
import { Order } from "src/orders/order.entity";
import { User } from "src/auth/user.entity";
import { Status } from "src/status/status.entity";

@Entity()
export class PaymentOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  pay_id: string;

  @ManyToOne(() => Payment, (payment) => payment.paymentOrder)
  payment: Payment;

  @OneToOne(()=>Order)
  order:Order;

  @ManyToOne(() => User, (user) => user.paymentOrder)
  user: User;


  @OneToOne(()=>Status)
  status:Status;


  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;
}
