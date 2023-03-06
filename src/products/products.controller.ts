import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) { }

  @Get()
  async find() {
    return this.productService.find();
  }

  @Get('/test')
  async test() {
    return this.productService.test();
  }

  @Get('/name/:name')
  async findByName(@Param('name') name: string) {
    return this.productService.findByName(name);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put()
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
