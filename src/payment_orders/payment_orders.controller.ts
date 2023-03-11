import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreatePaymentOrderDto } from './dto/create-payment_order.dto';
import { UpdatePaymentOrderDto } from './dto/update-payment_order.dto';
import { PaymentOrdersService } from './payment_orders.service';
@Controller('payment-orders')
export class PaymentOrdersController {
    constructor(private PaymentOrdersService: PaymentOrdersService) { }

    @Get()
    async find() {
        return this.PaymentOrdersService.find();
    }
    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return this.PaymentOrdersService.findOne(id);
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'Create payment order',
        type: CreatePaymentOrderDto,
    })
    async create(@Body() createPaymentOrderDto: CreatePaymentOrderDto) {
        return this.PaymentOrdersService.create(createPaymentOrderDto);
    }
    @Put('/:id')
    async update(
        @Param('id') id: number,
        @Body() updatePaymentOrderDto: UpdatePaymentOrderDto,
    ) {
        return this.PaymentOrdersService.update(id, updatePaymentOrderDto);
    }
}
