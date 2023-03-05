import { Discount } from '@src/discounts/discounts.entity';
import { OrderDetail } from '@src/order_details/order_details.entity';
import { Payment } from '@src/payments/payments.entity';

export class CreateOrderDto {
  ordercode: string;
  note: string;
  tax: number;
  discount: Discount;
  payment: Payment;
  orderDetails: OrderDetail[];
}
