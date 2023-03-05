import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  @Get()
  async find() {
    return this.ordersService.find();
  }
  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Get('/total/:id')
  async calORderTotal(@Param('id') id: number) {
    const order = await this.findOne(id);
    return this.ordersService.calORderTotal(order);
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
