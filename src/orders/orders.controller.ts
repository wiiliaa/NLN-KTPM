import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@src/auth/get-user.decorator';
import { User } from '@src/auth/user.entity';
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
    const order = await this.ordersService.findOne(id);
    return this.ordersService.responseOrderWithCal(order);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: User) {
    return this.ordersService.create(createOrderDto, user);
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
