import { User } from '@src/auth/user.entity';
import { CartItems } from '@src/cart_items/cart_item.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total: number;

    @OneToMany(() => CartItems, (cartItem) => cartItem.cart, {
        cascade: true,
        eager: true,
    })
    cartItems: CartItems[];

    @OneToOne(() => User)
    @JoinColumn()
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
