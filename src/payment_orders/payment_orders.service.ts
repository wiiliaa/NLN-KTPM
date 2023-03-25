import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentOrder } from './payment_orders.entity';
import { CreatePaymentOrderDto } from './dto/create-payment_order.dto';
import { UpdatePaymentOrderDto } from './dto/update-payment_order.dto';
@Injectable()
export class PaymentOrdersService {
    constructor(
        @InjectRepository(PaymentOrder)
        private paymentOrderRepository: Repository<PaymentOrder>,
    ) { }
    find() {
        return this.paymentOrderRepository.find();
    }
    async findOne(id: number) {
        const found = await this.paymentOrderRepository.findOne({ where: { id } });
        if (!found) {
            throw new InternalServerErrorException(`PaymentOrder:${id} non exist`);
        }
        return found;
    }

    async findOneByOrderId(orderId: number) {
        const found = await this.paymentOrderRepository.findOne({
            where: { order_id: orderId },
        });
        if (!found) {
            throw new InternalServerErrorException(`Order:${orderId} non exist`);
        }
        return found;
    }
    async create(createPaymentOrderDto: CreatePaymentOrderDto) {
        const { amount, orderId, payId } = createPaymentOrderDto;
        const paymentorder = new PaymentOrder();
        paymentorder.amount = amount;
        paymentorder.pay_id = payId;
        paymentorder.order_id = orderId;
        await paymentorder.save();
        return paymentorder;
    }
    async update(id: number, updatePaymentOrderDto: UpdatePaymentOrderDto) {
        const { amount, date, pay_id } = updatePaymentOrderDto;
        let paymentorder = await this.findOne(id);
        if (amount) {
            paymentorder.amount = amount;
        }
        if (date) {
            paymentorder.date = date;
        }
        if (pay_id) {
            paymentorder.pay_id = pay_id;
        }
        await paymentorder.save();
        return paymentorder;
    }
    async delete(id: number) {
        return this.paymentOrderRepository.delete(id);
    }
}
