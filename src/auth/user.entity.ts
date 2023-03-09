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

  @Column()
  birthday: Date;

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

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

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
