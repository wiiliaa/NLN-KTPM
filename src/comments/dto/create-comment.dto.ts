import { ApiProperty } from '@nestjs/swagger';
export class CreateCommentDto {
  @ApiProperty()
  text: String;

  @ApiProperty()
  rate: number;

  @ApiProperty()
  productId: number;
}
