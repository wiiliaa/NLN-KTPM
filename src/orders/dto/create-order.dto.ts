import { Discount } from '@src/discounts/discounts.entity';
import { OrderDetail } from '@src/order_details/order_details.entity';
import { Payment } from '@src/payments/payments.entity';
import { PaymentOrder } from '@src/payment_orders/payment_orders.entity';

export class CreateOrderDto {
  ordercode: string;
  note: string;
  tax: number;
  discount: Discount;
  payment: Payment;
  paymentOrder: PaymentOrder;
  orderDetails: OrderDetail[];
}
