import { Module } from '@nestjs/common';
import { CartItemsController } from './cart_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemsService } from './cart_items.service';
import { CartItems } from './cart_item.entity';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService],
  imports: [TypeOrmModule.forFeature([CartItems]), AuthModule],
  exports: [CartItemsService],
})
export class CartItemsModule { }
