import { Module } from "@nestjs/common";
import { OrderDetailsService } from "./order_details.service";
import { OrderDetailsController } from "./order_details.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetail } from "./order_details.entity";

@Module({
  providers: [OrderDetailsService],
  controllers: [OrderDetailsController],
  imports: [TypeOrmModule.forFeature([OrderDetail])],
})
export class OrderDetailsModule { }
