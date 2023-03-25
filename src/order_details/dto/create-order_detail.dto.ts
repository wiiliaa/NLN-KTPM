import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailDto {
  @ApiProperty()
  note: string;
  @ApiProperty()
  qty: number;
  @ApiProperty()
  productId: number;
  @ApiProperty()
  orderId: number;
}
