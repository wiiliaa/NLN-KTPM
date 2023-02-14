import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PaymentsService } from "./payments.service";
@Controller('payments')
export class PaymentsController {
    constructor(private PaymentService: PaymentsService) { }

    @Get()
    async find() {
      return this.PaymentService.find();
    }
    @Get("/:id")
    async findOne(@Param("id") id: number) {
      return this.PaymentService.findOne(id);
    }
    @Post()
    async create(@Body() createPaymentDto: CreatePaymentDto) {
      return this.PaymentService.create(createPaymentDto);
    }
    @Put("/:id")
    async update(@Param("id") id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
      return this.PaymentService.update(id, updatePaymentDto);
    }
}
