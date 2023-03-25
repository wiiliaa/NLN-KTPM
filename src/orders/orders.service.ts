import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from '@src/auth/user.entity';
import { OrderDetailsService } from '@src/order_details/order_details.service';
import { PaymentOrdersService } from '@src/payment_orders/payment_orders.service';
@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        private orderDetailService: OrderDetailsService,
        private paymentOrderService: PaymentOrdersService,
    ) { }

    find() {
        return this.orderRepository.find();
    }
    async findOne(id: number) {
        const found = await this.orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.orderDetails', 'orderDetails')
            .leftJoinAndSelect('orderDetails.product', 'product')
            .leftJoinAndSelect('order.payment', 'payment')
            .leftJoinAndSelect('order.discount', 'discount')
            .where('order.id = :id', { id })
            .getOne();
        found.paymentOrder = await this.paymentOrderService.findOneByOrderId(id);
        return found;
    }

    async remove(id: number) {
        const order = await this.findOne(id);
        return await order.remove();
    }

    async create(createOrderDto: CreateOrderDto, user: User) {
        const { note, ordercode, tax, paymentId, discountId, orderDetails } =
            createOrderDto;
        const order = new Order();
        order.orderDetails = [];
        if (orderDetails.length == 0) {
            throw new BadRequestException('Order Details is empty');
        }

        order.note = note;
        order.ordercode = ordercode;
        order.tax = tax;
        order.discount_id = discountId;
        order.payment_id = paymentId;
        order.user = user;
        await order.save();
        orderDetails.forEach(async (orderDetail) => {
            orderDetail.orderId = order.id;
            await this.orderDetailService.create(orderDetail);
        });
        let result = await this.findOne(order.id);
        return this.responseOrderWithCal(result);
    }

    responseOrderWithCal(order: Order) {
        const calOrderTotal = this.calORderTotal(order);
        if (!order.total && order.orderDetails) {
            order.total = calOrderTotal.totalAfter;
            order.save();
        }
        return {
            ...calOrderTotal,
            ...order,
        };
    }

    calORderTotal(order: Order) {
        let totalAll = 0;
        if (!order.orderDetails)
            return { totalAll, totalDiscount: 0, totalTax: 0, totalAfter: 0 };
        order.orderDetails.forEach((orderDetail) => {
            totalAll += orderDetail.qty * orderDetail.product.price;
        });
        let totalDiscount = 0;
        if (order.discount?.id) {
            totalDiscount = +(totalAll * (order.discount.percent / 100)).toFixed(2);
        }
        const totalTax = +(totalDiscount * (order.tax / 100)).toFixed(2);
        const totalAfter = +(totalAll - totalDiscount + totalTax).toFixed(2);
        return {
            totalAll,
            totalDiscount,
            totalTax,
            totalAfter,
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
