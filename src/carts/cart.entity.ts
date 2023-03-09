
import { CartItems } from "@src/cart_items/cart_item.entity";
import { BaseEntity, Column, CreateDateColumn, Entity,  ManyToOne,  OneToMany,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()

export class Cart extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    total: number;


    @OneToMany(()=> CartItems, (cartItem)=> cartItem.cart)
    cartItems: CartItems[];

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