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
            throw new InternalServerErrorException(`Files:${id} non exist`);
        }
        return found;
    }

    async remove(id: number) {
        const order = await this.findOne(id);
        return await order.remove();
    }

    async create(createOrderDto: CreateOrderDto) {
        const { note, ordercode, tax, payment, discount } = createOrderDto;
        const order = new Order();
        order.note = note;
        order.ordercode = ordercode;
        order.tax = tax;
        order.discount = discount;
        order.payment = payment;
        const result = await order.save();
        return this.responseOrderWithCal(result);
    }

    responseOrderWithCal(order: Order) {
        const calOrderTotal = this.calORderTotal(order);
        return {
            ...calOrderTotal,
            ...order,
        };
    }

    calORderTotal(order: Order) {
        let total = 0;
        order.orderDetails.forEach((orderDetail) => {
            total += orderDetail.qty * orderDetail.product.price;
        });
        const totalDiscount = +(total * (order.discount.percent / 100)).toFixed(2);
        const totalTax = +(totalDiscount * (order.tax / 100)).toFixed(2);
        return {
            total,
            totalDiscount,
            totalTax,
        };
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
