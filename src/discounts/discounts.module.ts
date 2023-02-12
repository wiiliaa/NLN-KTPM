import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';

@Module({
  providers: [DiscountsService],
  controllers: [DiscountsController]
})
export class DiscountsModule {}
