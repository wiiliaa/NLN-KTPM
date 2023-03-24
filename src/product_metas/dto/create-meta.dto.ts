import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@src/products/products.entity';

export class CreateMetatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;

  product: Product;
}
