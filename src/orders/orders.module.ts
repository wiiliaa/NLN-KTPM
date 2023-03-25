import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/auth/auth.module';
import { OrderDetailsModule } from '@src/order_details/order_details.module';
import { PaymentOrdersModule } from '@src/payment_orders/payment_orders.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order]),
    AuthModule,
    OrderDetailsModule,
    PaymentOrdersModule,
  ],
})
export class OrdersModule { }
