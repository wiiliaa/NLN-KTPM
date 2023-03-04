import { Discount } from '@src/discounts/discounts.entity';
import { Transport } from '@src/transports/transports.entity';
import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/products.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  const: number;

  @Column()
  note: string;

  @OneToOne(() => Product)
  product: Product;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @OneToOne(() => Discount)
  discount: Discount;

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
