import { ApiProperty } from '@nestjs/swagger';
import { Discount } from '@src/discounts/discounts.entity';
import { OrderDetail } from '@src/order_details/order_details.entity';
import { Payment } from '@src/payments/payments.entity';
import { PaymentOrder } from '@src/payment_orders/payment_orders.entity';

export class CreateOrderDto {
  @ApiProperty()
  ordercode: string;

  @ApiProperty()
  note: string;

  @ApiProperty()
  tax: number;

  @ApiProperty()
  @ApiProperty({
    default: 1,
    description: 'Discount ID',
  })
  discount: Discount;

  @ApiProperty({
    default: 1,
    description: 'payment ID',
  })
  payment: Payment;

  @ApiProperty({
    default: 1,
    description: 'payment order ID',
  })
  paymentOrder: PaymentOrder;

  @ApiProperty({
    type: [OrderDetail],
    description: 'array object order detail',
    default: [
      {
        qty: 231,
        product: 1,
      },
      {
        qty: 2,
        product: 2,
      },
      {
        qty: 512,
        product: 4,
      },
    ],
  })
  orderDetails: OrderDetail[];
}
