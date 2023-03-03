/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { OrderDetail } from '@src/order_details/order_details.entity';
import { Product } from '@src/products/products.entity';

@Entity()
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  coupon: string;

  @Column()
  limit: number;

  @Column({ type: 'float' })
  percent: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  note: string;

  @OneToOne(() => User)
  user: User;

  @OneToMany(()=>OrderDetail,(orderdetail)=>orderdetail)
  orderDetails:OrderDetail[];

  @ManyToOne(()=> Product,(product)=> product.discount)
  product: Product;

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
