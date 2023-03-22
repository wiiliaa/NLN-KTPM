import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/auth/user.entity';
import { Repository } from 'typeorm';
import { CartItems } from './cart_item.entity';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';

@Injectable()
export class CartItemsService {
    constructor(
        @InjectRepository(CartItems)
        private cartItemsRepository: Repository<CartItems>,
    ) { }

    findOne(user: User) {
        return this.cartItemsRepository.findOne({
            where: {
                user: {
                    id: user.id,
                },
            },
        });
    }

    async findById(id: number) {
        const found = await this.cartItemsRepository.findOne({ where: { id } });
        if (!found) {
            throw new InternalServerErrorException(`Cart:${id} non-exist`);
        }
        return found;
    }

    async push(createCartItemDto: CreateCartItemDto, user: User) {
        const cart = await this.findOne(user);
        const { product } = createCartItemDto;
        if (cart.hasId()) {
            const qty = cart.qty + createCartItemDto.qty;
            const updateCartItemDto: UpdateCartItemDto = {
                qty,
                product,
            };
            return this.update(cart.id, updateCartItemDto);
        } else {
            return this.create(createCartItemDto, user);
        }
    }

    async create(
        createCartItemDto: CreateCartItemDto,
        user: User,
    ): Promise<CartItems> {
        const { qty, product } = createCartItemDto;
        const cartItems = new CartItems();

        cartItems.qty = qty;
        cartItems.user = user;
        cartItems.product = product;

        await cartItems.save();
        return cartItems;
    }

    async update(id: number, updateCartItemDto: UpdateCartItemDto) {
        return this.cartItemsRepository
            .createQueryBuilder('cartItem')
            .update()
            .set(updateCartItemDto)
            .where('id = :id', { id })
            .execute();
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
