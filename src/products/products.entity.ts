import { CartItems } from '@src/cart_items/cart_item.entity';

import { Comment } from '@src/comments/comments.entity';
import { ProductCategory } from '@src/product_categories/product_categories.entity';
import { ProductMeta } from '@src/product_metas/product-metas.entity';
import { Status } from '@src/status/status.entity';
import { OrderDetail } from 'src/order_details/order_details.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ default: 1, nullable: true })
  qty: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  weight: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: 0 })
  width: number;

  @Column({ default: 0 })
  height: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @OneToMany(() => Comment, (comment) => comment.product, {
    eager: true,
  })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'product_id',
  })
  comments: Comment[];

  @ManyToOne(
    () => ProductCategory,
    (productcategory) => productcategory.products,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'category_id' })
  productCategory: ProductCategory;

  @Column({ nullable: true })
  category_id: number;

  @OneToMany(() => ProductMeta, (productmeta) => productmeta.product, {
    eager: true,
    cascade: true,
  })
  productMetas: ProductMeta[];

  // @OneToOne(() => Status, (status) => status.product)
  // status: Status;

  @ManyToOne(() => CartItems, (cartItem) => cartItem.product)
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
