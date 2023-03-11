import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@src/products/products.entity';

export class CreateCartItemDto {
    @ApiProperty()
    qty: number;

    @ApiProperty({
        default: 1,
        description: 'Product ID',
    })
    product: Product;
}
