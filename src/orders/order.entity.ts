import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDetail } from "src/order_details/order_details.entity";
import { PaymentOrder } from "src/payment_orders/payment_orders.entity";
import { Payment } from "src/payments/payments.entity";
import { User } from "src/auth/user.entity";


@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ordercode: string;

    @Column()
    note: string;


    @ManyToOne(() => Payment, (payment) => payment.orders)
    payment: Payment;

    
    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.orders)
    Order_details: OrderDetail[];

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
