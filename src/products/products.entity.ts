import { OrderDetail } from "src/order_details/order_details.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: "float" })
  price: number;

  @Column({ type: "float" })
  weight: number;

  @Column({ default: 0 })
  width: number;

  @Column({ default: 0 })
  height: number;

  @Column({ default: 0 })
  length: number;

  @Column()
  description: string;

  @OneToMany(()=>OrderDetail, (order_detail)=>order_detail.product)
  orderDetails:OrderDetail[];
  
}
