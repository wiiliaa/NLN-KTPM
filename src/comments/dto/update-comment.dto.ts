import { ApiProperty } from "@nestjs/swagger";

export class UpdateCommentDto {
    @ApiProperty()
    text: string;

    @ApiProperty()
    rate: number;

    @ApiProperty()
    productId: number;
}