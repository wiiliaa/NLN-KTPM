import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentOrderDto {
    @ApiProperty()
    amount: number;

    @ApiProperty()
    payId: string;

    @ApiProperty()
    orderId: number;

    @ApiProperty()
    statusId?: number;
}
