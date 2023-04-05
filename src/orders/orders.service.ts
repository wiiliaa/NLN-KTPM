import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDetailsService } from '@src/order_details/order_details.service';
import { PaymentOrdersService } from '@src/payment_orders/payment_orders.service';
@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        private orderDetailService: OrderDetailsService,
        private paymentOrderService: PaymentOrdersService,
    ) { }

    async find() {
        const orders = await this.orderRepository.find();
        const result = [];
        for (let i = 0; i < orders.length; i++) {
            result[i] = this.responseOrderWithCal(orders[i]);
        }
        return result;
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
        try {
            found.paymentOrder = await this.paymentOrderService.findOneByOrderId(id);
        } catch (err) { }
        return found;
    }

    async remove(id: number) {
        const order = await this.findOne(id);
        order.orderDetails.forEach(async (orderDetail) => {
            await this.orderDetailService.delete(orderDetail.id);
        });
        if (order?.paymentOrder) {
            await this.paymentOrderService.delete(order.paymentOrder.id);
        }

        return await order.remove();
    }

    async create(createOrderDto: CreateOrderDto) {
        const { note, tax, paymentId, discountId, orderDetails, userId, statusId } =
            createOrderDto;
        const order = new Order();
        order.orderDetails = [];
        if (orderDetails.length == 0) {
            throw new BadRequestException('Order Details is empty');
        }

        order.note = note;
        order.ordercode = this.randomOrderCode();
        order.tax = tax;
        order.discount_id = discountId;
        order.payment_id = paymentId;
        order.user_id = userId;
        order.status_id = statusId;
        await order.save();
        for (let i = 0; i < orderDetails.length; i++) {
            orderDetails[i].orderId = order.id;
            let newOrderDetail = await this.orderDetailService.create(
                orderDetails[i],
            );
            order.orderDetails.push(newOrderDetail);
        }
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
        try {
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
        } catch (err) {
            return {
                totalAll: 0,
                totalDiscount: 0,
                totalTax: 0,
                totalAfter: 0,
            };
        }
    }

    /// make function random number 1000 to 10000
    randomOrderCode() {
        return `OZK-${Math.floor(Math.random() * 10000) + 1000}`;
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
