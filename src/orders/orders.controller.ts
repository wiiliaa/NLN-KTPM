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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentOrderDto } from '@src/payment_orders/dto/create-payment_order.dto';
import { PaymentOrdersService } from '@src/payment_orders/payment_orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import { MomoService } from './providers/momo.service';

@ApiTags('Order')
@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private paymentOrderService: PaymentOrdersService,
    private momoService: MomoService,
  ) { }

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
  @ApiResponse({
    status: 201,
    description: 'Create order',
    type: CreateOrderDto,
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'Update order',
    type: UpdateOrderDto,
  })
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

  @Get('/:orderId/momo')
  async payMomoTransaction(@Param('orderId') orderId: number) {
    const data = this.momoService.paymentSuccess(orderId);
    const order = await this.ordersService.findOne(orderId);
    const createPaymentOrderDto: CreatePaymentOrderDto = {
      orderId: order.id,
      amount: order.total,
      payId: data.payId,
    };
    const paymentOrder = await this.paymentOrderService.create(
      createPaymentOrderDto,
    );
    return {
      ...data,
      ...paymentOrder,
    };
  }
  @Get('/:orderId/momo/create')
  async createMomoTransaction(@Param('orderId') orderId: number) {
    return this.momoService.createTransaction(orderId);
  }
}
