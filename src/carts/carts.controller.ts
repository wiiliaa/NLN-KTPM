import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './carts.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
    constructor(private cartService : CartService) {}

    @Get()
    async find(){
        return this.cartService.find();
    }
    
    @Get("/id/:id")
    async findByName(@Param("id") id: number ) {
    return this.cartService.findById(id);
    }

    @Post()
    async create(@Body() createCartDto : CreateCartDto){
      return this.cartService.create(createCartDto);
    }

    @Put()
    async update(@Param("id") id: number , @Body() updateCartDto : UpdateCartDto){
      return this.cartService.update(id,updateCartDto);
    }

    @Delete("/:id")
    async delete(@Param("id") id: number) {
    return this.cartService.delete(id);
  }
}
