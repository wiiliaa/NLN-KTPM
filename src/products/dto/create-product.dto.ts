import { ApiProperty } from '@nestjs/swagger';
import { ProductMeta } from '@src/product_metas/product-metas.entity';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  width: number;

  @ApiProperty()
  height: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  productMetas: ProductMeta[];
}
