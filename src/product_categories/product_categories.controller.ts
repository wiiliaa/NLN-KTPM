import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProductCategoriesService } from './product_categories.service';

@ApiTags('Product Categories')
@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private productCategoriesService: ProductCategoriesService) { }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all product categories',
  })
  async find() {
    return this.productCategoriesService.find();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create product category',
    type: CreateCategoryDto,
  })
  async create(@Body() createCategory: CreateCategoryDto) {
    return this.productCategoriesService.create(createCategory);
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.productCategoriesService.findById(id);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    this.productCategoriesService.update(id, updateCategory);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    this.productCategoriesService.delete(id);
  }
}
