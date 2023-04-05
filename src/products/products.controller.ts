import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterProductDto } from './dto/filter-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import * as appRootPath from 'app-root-path';
import { join } from 'path';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) { }

  @Get()
  async find(@Query() filterProductDto: FilterProductDto) {
    return this.productService.find(filterProductDto);
  }

  @Get('/all')
  async getAll() {
    return this.productService.findAll();
  }

  @Get('/slug/:slug')
  async findSlug(@Param('slug') slug: string) {
    const product = await this.productService.findBySlug(slug);
    return this.productService.parseToResult(product);
  }
  @Get('/category_id/:category_id')
  async findCategory(@Param('category_id') category_id: number) {
    return this.productService.findByCategory(category_id);
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
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    // save the image file to the server
    const filename = `${Date.now()}.jpg`;
    const path = `${appRootPath}/uploads/${filename}`;
    const fileStream = createWriteStream(path);
    fileStream.write(image.buffer);
    createProductDto.image = `/uploads/${filename}`;

    const { meta_name, meta_value } = createProductDto;
    createProductDto.productMetas = [];
    meta_name.forEach((name, index) => {
      createProductDto.productMetas.push({
        name,
        value: meta_value[index],
      });
    });

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
