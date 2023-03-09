import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
    ) { }
    find() {
        return this.orderRepository.find();
    }
    async findOne(id: number) {
        const found = await this.orderRepository.findOne({ where: { id } });
        if (!found) {
            throw new InternalServerErrorException(`Order:${id} non exist`);
        }
        return found;
    }
    // async findByProduct(productId: number) { }
    async create(createOrderDto: CreateOrderDto) {
        const { note, ordercode } = createOrderDto;
        const order = new Order();
        order.note = note;
        order.ordercode = ordercode;
        return await order.save();
    }
    async update(id: number, updateOrderDto: UpdateOrderDto) {
        const { note, ordercode } = updateOrderDto;
        let order = await this.findOne(id);
        if (note) {
            order.note = note;
        }
        if (ordercode) {
            order.ordercode = ordercode;
        }
        await order.save();
        return order;
    }
    async delete(id: number) {
        return this.orderRepository.delete(id);
    }
}
