import { User } from '@src/auth/user.entity';
import { Cart } from '@src/carts/cart.entity';
import { Product } from '@src/products/products.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CartItems extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    qty: number;

    @ManyToOne(() => Cart, (cart) => cart.cartItems)
    cart: Cart;

    @ManyToOne(() => Product, (product) => product.cartItems, {
        eager: true,
    })
    product: Product;

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
