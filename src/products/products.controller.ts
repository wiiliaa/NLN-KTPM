import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterProductDto } from './dto/filter-product.dto';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) { }

  @Get()
  async find(@Query() filterProductDto: FilterProductDto) {
    return this.productService.find(filterProductDto);
  }
  @Get('/slug/:slug')
  async findSlug(@Param('slug') slug: string) {
    const product = await this.productService.findBySlug(slug);
    return this.productService.parseToResult(product);
  }

  @Get('/id/:id')
  async findOne(@Param('id') id: number) {
    const product = await this.productService.findById(id);
    return this.productService.parseToResult(product);
  }

  @Get('/name/:name')
  async findByName(@Param('name') name: string) {
    return this.productService.findByName(name);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create product',
    type: CreateProductDto,
  })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put()
  @ApiResponse({
    status: 200,
    description: 'Update product',
    type: UpdateProductDto,
  })
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
