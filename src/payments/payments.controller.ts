import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentsService } from './payments.service';

@ApiTags('Payment')
@Controller('payments')
export class PaymentsController {
    constructor(private PaymentService: PaymentsService) { }

    @Get()
    async find() {
        return this.PaymentService.find();
    }
    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return this.PaymentService.findOne(id);
    }
    @Post()
    @ApiResponse({
        status: 201,
        description: 'Create payment',
        type: CreatePaymentDto,
    })
    async create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.PaymentService.create(createPaymentDto);
    }
    @Put('/:id')
    async update(
        @Param('id') id: number,
        @Body() updatePaymentDto: UpdatePaymentDto,
    ) {
        return this.PaymentService.update(id, updatePaymentDto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.PaymentService.delete(id);
    }
}
