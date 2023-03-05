import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './order_details.entity';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
@Injectable()
export class OrderDetailsService {
    constructor(
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>,
    ) { }
    find() {
        return this.orderDetailRepository.find();
    }
    async findOne(id: number) {
        const found = await this.orderDetailRepository.findOne({ where: { id } });
        if (!found) {
            throw new InternalServerErrorException(`Files:${id} non exist`);
        }
        return found;
    }
    async create(createOrderDto: CreateOrderDetailDto) {
        const { qty, note, product } = createOrderDto;
        const orderDetail = new OrderDetail();
        orderDetail.note = note;
        orderDetail.qty = qty;
        orderDetail.product = product;
        return await orderDetail.save();
    }
    async update(id: number, updateOrderDto: UpdateOrderDetailDto) {
        const { price, date, note } = updateOrderDto;
        let orderDetail = await this.findOne(id);
        if (date) {
            orderDetail.date = date;
        }
        if (note) {
            orderDetail.note = note;
        }
        await orderDetail.save();
        return orderDetail;
    }
    async delete(id: number) {
        return this.orderDetailRepository.delete(id);
    }
}
