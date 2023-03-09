import { Cart } from "@src/carts/cart.entity";
import { Product } from "@src/products/products.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
    export class CartItems extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quatity: number;

    @ManyToOne(()=> Cart, (cart)=> cart.cartItems)
    cart: Cart;

    @OneToMany(()=> Product, (product)=> product.cartItem)
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