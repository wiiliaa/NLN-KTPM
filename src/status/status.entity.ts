/* eslint-disable prettier/prettier */
import { Comment } from '@src/comments/comments.entity';
import { Order } from '@src/orders/order.entity';
import { Payment } from '@src/payments/payments.entity';
import { Product } from '@src/products/products.entity';
import { User } from 'src/auth/user.entity';
import { PaymentOrder } from 'src/payment_orders/payment_orders.entity';
import {
    BaseEntity,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';

// Các table khác dùng khoá của status là đủ rồi, không cần phải liên kết ở table status

@Entity()
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    target: string;

    @OneToMany(() => Order, (order) => order.status)
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'status_id',
    })
    orders: Order[];

    // @OneToMany((type) => Comment, (comment) => comment.status)
    // comments: Comment[];

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
