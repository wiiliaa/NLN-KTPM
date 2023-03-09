
import { CartItems } from '@src/cart_items/cart_item.entity';

import { Comment } from '@src/comments/comments.entity';
import { Discount } from '@src/discounts/discounts.entity';
import { File } from '@src/files/files.entity';
import { ProductCategory } from '@src/product_categories/product_categories.entity';
import { ProductMeta } from '@src/product_metas/product-metas.entity';
import { Status } from '@src/status/status.entity';
import { OrderDetail } from 'src/order_details/order_details.entity';
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

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  qty: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  weight: number;

  @Column({ default: 0 })
  width: number;

  @Column({ default: 0 })
  height: number;

  @Column()
  description: string;

  @Column()
  image: string

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @OneToMany(() => Comment, (comment) => comment.product, {
    eager: true,
  })
  comments: Comment[];

  @Column({ array: true, default: [], nullable: true })
  images: [];

  @ManyToOne(
    () => ProductCategory,
    (productcategory) => productcategory.product,
    {
      eager: true,
    },
  )
  productcategory: ProductCategory;

  @OneToMany(() => ProductMeta, (productmeta) => productmeta.product, {
    eager: true,
  })
  productmetas: ProductMeta[];

  @OneToOne(() => Status, (status) => status.product)
  status: Status;

  @ManyToOne(()=>CartItems, (cartItem)=> cartItem.product)
  cartItem: CartItems;



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
