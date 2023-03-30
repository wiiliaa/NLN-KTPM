import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/products.entity';
import { Status } from 'src/status/status.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: String;

  @Column()
  rate: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  // @OneToOne(() => Status)
  // @JoinColumn({ name: 'status_id' })
  // status: Status;
  //
  // @Column({ default: 1 })
  // status_id: number;

  @ManyToOne(() => Product, (product) => product.comments)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_id: number;

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
