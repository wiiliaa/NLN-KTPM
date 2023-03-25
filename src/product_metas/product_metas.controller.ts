import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductMetasService } from './product_metas.service';
import { CreateMetatDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ProductMeta')
@Controller('product-metas')
export class ProductMetasController {
  constructor(private productMetaService: ProductMetasService) { }

  @Get()
  async find() {
    return this.productMetaService.find();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create product meta',
    type: CreateMetatDto,
  })
  async create(@Body() createMetaDto: CreateMetatDto) {
    return this.productMetaService.create(createMetaDto);
  }

  @Put()
  async update(@Param('id') id: number, @Body() updateMetaDto: UpdateMetaDto) {
    this.productMetaService.update(id, updateMetaDto);
  }

  @Delete()
  async delete(@Param('id') id: number) {
    this.productMetaService.delete(id);
  }
}
