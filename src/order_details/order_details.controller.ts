import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { OrderDetailsService } from './order_details.service';

@ApiTags('OrderDetail')
@Controller('order-details')
export class OrderDetailsController {
    constructor(private OrderDetailService: OrderDetailsService) { }

    @Get()
    async find() {
        return this.OrderDetailService.find();
    }
    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return this.OrderDetailService.findOne(id);
    }
    @ApiResponse({
        status: 201,
        description: 'Create order detail',
        type: CreateOrderDetailDto,
    })
    @Post()
    async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
        return this.OrderDetailService.create(createOrderDetailDto);
    }

    @ApiResponse({
        status: 201,
        description: 'Update order detail',
        type: UpdateOrderDetailDto,
    })
    @Put('/:id')
    async update(
        @Param('id') id: number,
        @Body() updateOrderDetailDto: UpdateOrderDetailDto,
    ) {
        return this.OrderDetailService.update(id, updateOrderDetailDto);
    }
}
