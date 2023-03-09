import { Module } from '@nestjs/common';
import { CartItemsController } from './cart_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemsService } from './cart_items.service';
import { CartItems } from './cart_item.entity';

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService],
  imports: [TypeOrmModule.forFeature([CartItems])],
  exports: [CartItemsService],
})
export class CartItemsModule {}
