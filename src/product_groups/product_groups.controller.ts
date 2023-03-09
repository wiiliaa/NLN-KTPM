import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductGroupsService } from './product_groups.service';
import { CreateProductGroupDto } from './dto/create-product_group.dto';
import { UpdateProductGroupDto } from './dto/update-product_group.dto';

@Controller('product-groups')
export class ProductGroupsController {
    constructor(private productGroupService: ProductGroupsService){}

    @Get()
  async find() {
    return this.productGroupService.find();
  }

  @Post()
  async create(@Body() createProductDto: CreateProductGroupDto) {
    return this.productGroupService.create(createProductDto);
  }

  @Put()
  async update(
    @Param("id") id: number,
    @Body() updateProductDto: UpdateProductGroupDto) {
    return this.productGroupService.update(id, updateProductDto);
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.productGroupService.delete(id);
  }

}
