import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentOrderDto {
    @ApiProperty()
    amount: number;
    @ApiProperty()
    date: Date;
    @ApiProperty()
    pay_id: string;
}
