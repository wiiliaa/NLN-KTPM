import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/products.entity';

export class CreateCommentDto {
  @ApiProperty()
  text: String;
  @ApiProperty()
  rate: number;
  @ApiProperty()
  user: User;
  @ApiProperty()
  product: Product;
}
