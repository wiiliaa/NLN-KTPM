import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { CreateOrderDetailDto } from "./dto/create-order_detail.dto";
import { UpdateOrderDetailDto } from "./dto/update-order_detail.dto";
import { OrderDetailsService } from "./order_details.service";
@Controller('order-details')
export class OrderDetailsController {
    constructor(private OrderDetailService: OrderDetailsService) { }

    @Get()
    async find() {
      return this.OrderDetailService.find();
    }
    @Get("/:id")
    async findOne(@Param("id") id: number) {
      return this.OrderDetailService.findOne(id);
    }
    @Post()
    async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
      return this.OrderDetailService.create(createOrderDetailDto);
    }
    @Put("/:id")
    async update(@Param("id") id: number, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
      return this.OrderDetailService.update(id, updateOrderDetailDto);
    }
}
