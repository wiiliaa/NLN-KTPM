import { Product } from '@src/products/products.entity';

export class UpdateCartItemDto {
    qty: number;
    product: Product;
}
