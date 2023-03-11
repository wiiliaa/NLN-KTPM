import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDto {
    @ApiProperty()
    total: number;
}
