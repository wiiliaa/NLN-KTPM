import { Controller } from "@nestjs/common";
import { Body, Delete, Get, Param, Post, Put } from "@nestjs/common/decorators";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ProductCategoriesService } from "./product_categories.service";

@Controller("product-categories")
export class ProductCategoriesController {
  constructor(private productCategoriesService: ProductCategoriesService) {}

  @Get()
  async find() {
    return this.productCategoriesService.find();
  }

  @Post()
  async create(@Body() createCategory: CreateCategoryDto) {
    return this.productCategoriesService.create(createCategory);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() updateCategory : UpdateCategoryDto) {
    this.productCategoriesService.update(id, updateCategory);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    this.productCategoriesService.delete(id);
  }
}
