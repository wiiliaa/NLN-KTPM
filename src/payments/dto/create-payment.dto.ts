import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    note: string;
}
