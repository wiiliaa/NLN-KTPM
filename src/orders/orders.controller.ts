import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrdersService } from "./orders.service";
@Controller('order')
export class OrdersController {
  constructor(private OrdersService: OrdersService) { }

  @Get()
  async find() {
    return this.OrdersService.find();
  }
  @Get("/:id")
  async findOne(@Param("id") id: number) {
    return this.OrdersService.findOne(id);
  }
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.OrdersService.create(createOrderDto);
  }
  @Put("/:id")
  async update(@Param("id") id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.OrdersService.update(id, updateOrderDto);
  }
}
