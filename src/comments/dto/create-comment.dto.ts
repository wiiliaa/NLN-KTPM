import { User } from "src/auth/user.entity";
import { Product } from "src/products/products.entity";

export class CreateCommentDto {
  text: String;
  rate: number;
  user: User;
  product: Product;
}
