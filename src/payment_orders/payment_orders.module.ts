import { Module } from '@nestjs/common';
import { PaymentOrdersService } from './payment_orders.service';
import { PaymentOrdersController } from './payment_orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentOrder } from './payment_orders.entity';

@Module({
  providers: [PaymentOrdersService],
  controllers: [PaymentOrdersController],
  imports: [TypeOrmModule.forFeature([PaymentOrder])],
  exports: [PaymentOrdersService],
})
export class PaymentOrdersModule { }
