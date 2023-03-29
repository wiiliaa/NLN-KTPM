import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDetailDto } from '@src/order_details/dto/create-order_detail.dto';

export class CreateOrderDto {
  @ApiProperty()
  note: string;

  @ApiProperty()
  tax: number;

  @ApiProperty()
  @ApiProperty({
    default: 1,
    description: 'Discount ID',
  })
  discountId: number;

  @ApiProperty({
    default: 1,
    description: 'payment ID',
  })
  paymentId: number;

  @ApiProperty({
    type: [CreateOrderDetailDto],
    description: 'array object order detail',
    default: [
      {
        qty: 231,
        productId: 1,
      },
      {
        qty: 2,
        productId: 2,
      },
      {
        qty: 512,
        productId: 4,
      },
    ],
  })
  orderDetails: CreateOrderDetailDto[];

  @ApiProperty({
    default: 1,
    description: 'user ID',
  })
  userId?: number;

  @ApiProperty({
    default: 1,
    description: 'status ID',
    example: 1,
  })
  statusId?: number;
}
