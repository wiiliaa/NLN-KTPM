import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
    ) { }

    find() {
        return this.cartsRepository.find();
    }

    async findById(id: number) {
        const found = await this.cartsRepository.findOne({ where: { id } });
        if (!found) {
            throw new InternalServerErrorException(`Cart:${id} non-exist`);
        }
        return found;
    }

    async create(createCartDto: CreateCartDto): Promise<Cart> {
        const { total } = createCartDto;
        const cartItems = new Cart();

        cartItems.total = total;

        await cartItems.save();
        return cartItems;
    }

    async update(id: number, updateCartDto: UpdateCartDto) {
        return this.cartsRepository
            .createQueryBuilder('cart')
            .update()
            .set(updateCartDto)
            .where('id = :id', { id })
            .execute();
    }

    async delete(id: number) {
        let status = true;
        const target = await this.cartsRepository.delete(id);
        if (!target) {
            status = false;
        }
        return { status };
    }
}
