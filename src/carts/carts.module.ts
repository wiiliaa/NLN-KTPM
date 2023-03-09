import { Module } from '@nestjs/common';
import { CartController } from './carts.controller';
import { CartService } from './carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [TypeOrmModule.forFeature([Cart])],
  exports: [CartService],
})
export class CartsModule {}
