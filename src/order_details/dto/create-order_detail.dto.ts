import { Product } from '@src/products/products.entity';

export class CreateOrderDetailDto {
  note: string;
  qty: number;
  product: Product;
}
