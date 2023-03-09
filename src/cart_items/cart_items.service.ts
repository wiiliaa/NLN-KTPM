import { Injectable,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItems } from './cart_item.entity';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';


@Injectable()
export class CartItemsService {

    constructor(
        @InjectRepository(CartItems) private cartItemsRepository : Repository<CartItems>
    ){}

    find() {
        return this.cartItemsRepository.find();
    }
    
    async findById(id: number) {
        const found = await this.cartItemsRepository.findOne({ where: { id } });
        if (!found) {
          throw new InternalServerErrorException(`Cart:${id} non-exist`);
        }
        return found;
    }

    async create(createCartItemDto : CreateCartItemDto) : Promise<CartItems> {
        const { quatity } = createCartItemDto;
        const cartItems = new CartItems();

        cartItems.quatity = quatity;

        await cartItems.save();
        return cartItems;
    }

    async update(id : number, updateCartItemDto : UpdateCartItemDto) {
        const { quatity } = updateCartItemDto ;
        const cartItems = new CartItems();

        cartItems.quatity = quatity;

        await cartItems.save();
        return cartItems;
    }


    async delete(id: number) {
        let status = true;
        const target = await this.cartItemsRepository.delete(id);
        if (!target) {
          status = false;
        }
        return { status };
    }
}
