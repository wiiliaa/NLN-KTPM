/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from 'src/orders/order.entity';
import { Role } from 'src/roles/roles.entity';
import { Cart } from '@src/carts/cart.entity';
import { Comment } from '@src/comments/comments.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column({ default: '', nullable: true })
  birthday: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  province_name: string;

  @Column()
  district_name: string;

  @Column()
  ward_name: string;

  @OneToOne(() => Role, (role) => role.user)
  roles: Role;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToOne(() => Cart)
  cart: Cart;

  @OneToOne(() => Role)
  role: Role;
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
