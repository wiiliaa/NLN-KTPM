import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { OrderDetail } from 'src/order_details/order_details.entity';
import { Payment } from 'src/payments/payments.entity';
import { User } from 'src/auth/user.entity';
import { Discount } from '@src/discounts/discounts.entity';
import { PaymentOrder } from '@src/payment_orders/payment_orders.entity';

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ordercode: string;

    @Column()
    note: string;

    @Column({ type: 'float', nullable: true, default: '10' })
    tax: number;

    @Column({ type: 'float', nullable: true })
    total: number;

    @ManyToOne(() => Discount, (discount) => discount.orders, {
        eager: true,
    })
    @JoinColumn({ name: 'discount_id' })
    discount: Discount;

    @Column({ nullable: true })
    discount_id: number;

    @ManyToOne(() => Payment, (payment) => payment.orders, {
        eager: true,
    })
    @JoinColumn({ name: 'payment_id' })
    payment: Payment;

    @Column({ nullable: true })
    payment_id: number;

    @OneToOne(() => PaymentOrder)
    paymentOrder: PaymentOrder;

    @ManyToOne(() => User, (user) => user.orders, {
        eager: true,
    })
    user: User;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
        eager: true,
        cascade: true,
    })
    orderDetails: OrderDetail[];

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
