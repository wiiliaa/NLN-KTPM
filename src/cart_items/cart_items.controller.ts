import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';

@Controller('cart-items')
export class CartItemsController {
    constructor(private cartItemService : CartItemsService){}

    @Get()
    async find() {
      return this.cartItemService.find();
    }

    @Post()
    async create(@Body() createCartItemDto : CreateCartItemDto){
      return this.cartItemService.create(createCartItemDto);
    }

    @Put()
    async update(@Param("id") id: number , @Body() updateCartItemDto : UpdateCartItemDto){
      return this.cartItemService.update(id,updateCartItemDto);
    }

    @Delete("/:id")
    async delete(@Param("id") id: number) {
    return this.cartItemService.delete(id);
  }

}
