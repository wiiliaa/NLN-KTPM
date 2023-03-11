import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetUser } from '@src/auth/get-user.decorator';
import { User } from '@src/auth/user.entity';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';

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
  async create(
    @Body() createDiscountDto: CreateDiscountDto,
    @GetUser() user: User,
  ) {
    return this.discountsService.create(user, createDiscountDto);
  }
}
