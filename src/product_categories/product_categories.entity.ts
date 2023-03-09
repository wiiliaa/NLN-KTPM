/* eslint-disable prettier/prettier */
import { ProductGroup } from "@src/product_groups/product_group.entity";
import { Product } from "@src/products/products.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class ProductCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @OneToOne(()=>Product,(product)=>product.productcategory)
  product: Product;

  @ManyToOne(()=>ProductGroup, (productGroup)=> productGroup.productCategory)
  productGroup: ProductGroup;

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
