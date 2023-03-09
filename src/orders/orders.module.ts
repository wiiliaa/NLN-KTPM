import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/auth/auth.module';
import { OrderDetailsModule } from '@src/order_details/order_details.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
<<<<<<< HEAD
  imports: [TypeOrmModule.forFeature([Order])],
  exports: [OrdersService]

=======
  imports: [TypeOrmModule.forFeature([Order]), AuthModule, OrderDetailsModule],
>>>>>>> tthao123/feature/update-order
})
export class OrdersModule { }
