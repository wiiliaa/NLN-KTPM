import { Discount } from "@src/discounts/discounts.entity";
import { Order } from "src/orders/order.entity";
import { Product } from "src/products/products.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: string;
  
  @Column()
  date: Date;

  @Column()
  note: string;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  orders: Order;

  @ManyToOne(() => Discount, (discount) => discount.orderDetails)
  discount: Discount;

  @ManyToOne(() => Transport, (transport) => transport.orderDetails)
  transport: Transport;

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
