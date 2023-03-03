import { User } from "src/auth/user.entity";
import { Product } from "src/products/products.entity";
import { Status } from "src/status/status.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: String;

  @Column()
  rate: number;

  @OneToOne(() => User)
  user: User;

  @OneToOne(() => Status)

  // @OneToOne(() => Status, (status)=>status.comments)
  // status: Status;
  @ManyToOne(() => Product, (product) => product.comments)
  product: Product;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  //

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;
}
