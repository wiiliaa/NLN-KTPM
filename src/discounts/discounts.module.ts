import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './discounts.entity';

@Module({
  providers: [DiscountsService],
  controllers: [DiscountsController],
  imports: [TypeOrmModule.forFeature([Discount])],
})
export class DiscountsModule { }
