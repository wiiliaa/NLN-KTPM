import { Module } from "@nestjs/common";
import { ProductCategoriesController } from "./product_categories.controller";
import { ProductCategoriesService } from "./product_categories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCategory } from "./product_categories.entity";

@Module({
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService],
  imports: [TypeOrmModule.forFeature([ProductCategory])],
})
export class ProductCategoriesModule {}
