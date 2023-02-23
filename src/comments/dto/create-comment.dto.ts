import { Product } from 'src/products/products.entity';

export class CreateCommentDto {
  text: String;
  rate: number;
  product: Product;
}
