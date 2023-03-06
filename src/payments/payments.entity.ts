import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentOrder } from 'src/payment_orders/payment_orders.entity';
import { Order } from 'src/orders/order.entity';

@Entity()
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    note: string;

    @OneToMany(() => PaymentOrder, (paymentOrder) => paymentOrder.payment)
    paymentOrders: PaymentOrder[];

    @OneToMany(() => Order, (payment) => payment.payment)
    orders: Order[];

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
