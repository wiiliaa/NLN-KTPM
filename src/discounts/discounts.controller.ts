import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';

@ApiTags('Discount')
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) { }
  @Get('/')
  async find() {
    return this.discountsService.find();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.discountsService.findOne(id);
  }

  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'Create discount',
    type: CreateDiscountDto,
  })
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountsService.create(createDiscountDto);
  }
}
