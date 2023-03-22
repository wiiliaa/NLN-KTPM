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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GetUser } from '@src/auth/get-user.decorator';
import { User } from '@src/auth/user.entity';
import { CartItemsService } from './cart_items.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';

@Controller('cart-items')
@ApiBearerAuth('access-token')
export class CartItemsController {
    constructor(private cartItemService: CartItemsService) { }

    @Get()
    @UseGuards(AuthGuard())
    @ApiResponse({
        status: 200,
        description: 'The found record',
    })
    async find(@GetUser() user: User) {
        return this.cartItemService.findOne(user);
    }

    @Post()
    @UseGuards(AuthGuard())
    @ApiBearerAuth('access-token')
    async create(
        @Body() createCartItemDto: CreateCartItemDto,
        @GetUser() user: User,
    ) {
        return this.cartItemService.push(createCartItemDto, user);
    }

    @Put()
    @UseGuards(AuthGuard())
    async update(
        @Param('id') id: number,
        @Body() updateCartItemDto: UpdateCartItemDto,
    ) {
        return this.cartItemService.update(id, updateCartItemDto);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    async delete(@Param('id') id: number) {
        return this.cartItemService.delete(id);
    }
}
