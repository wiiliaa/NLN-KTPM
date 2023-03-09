import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/products.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
<<<<<<< HEAD
  OneToOne,
=======
  ManyToOne,
>>>>>>> tthao123/feature/update-order
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
<<<<<<< HEAD
  const: number;
=======
  qty: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  date: Date;
>>>>>>> tthao123/feature/update-order

  @Column({ nullable: true })
  note: string;

  @ManyToOne(() => Product, (product) => product.orderDetails, {
    eager: true,
  })
  @JoinColumn()
  product: Product;

<<<<<<< HEAD
  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @OneToOne(() => Discount)
  discount: Discount;
=======
  @ManyToOne(() => Order)
  order: Order;
>>>>>>> tthao123/feature/update-order

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
