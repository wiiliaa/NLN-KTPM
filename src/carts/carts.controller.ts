import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { CartService } from './carts.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@src/auth/get-user.decorator';
import { User } from '@src/auth/user.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) { }

    @Get()
    async find() {
        return this.cartService.find();
    }

    @Get('/id/:id')
    async findByName(@Param('id') id: number) {
        return this.cartService.findById(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    @ApiResponse({
        status: 201,
        description: 'Create cart',
        type: CreateCartDto,
    })
    async create(@Body() createCartDto: CreateCartDto, @GetUser() user: User) {
        return this.cartService.create(createCartDto, user);
    }

    @Put()
    @UseGuards(AuthGuard())
    @ApiResponse({
        status: 200,
        description: 'Update cart',
        type: UpdateCartDto,
    })
    async update(@Param('id') id: number, @Body() updateCartDto: UpdateCartDto) {
        return this.cartService.update(id, updateCartDto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.cartService.delete(id);
    }
}
