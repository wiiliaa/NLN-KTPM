/* eslint-disable prettier/prettier */
import { Comment } from '@src/comments/comments.entity';
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

    @OneToOne(() => User)
    user: User;

    @OneToMany(() => Comment, (comment) => comment.status)
    comments: Comment[];

    @OneToMany(() => PaymentOrder, (paymentorder) => paymentorder.status)
    paymentOrders: PaymentOrder[];

    @OneToMany(() => Product, (product) => product.status)
    product: Product[];

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
