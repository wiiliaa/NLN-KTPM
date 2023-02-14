import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "./payments.entity";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>
      ) { }
    find() {
        return this.paymentRepository.find();
    }
    async findOne(id: number) {
        const found = await this.paymentRepository.findOne({ where: { id } });
        if (!found) {
          throw new InternalServerErrorException(`Files:${id} non exist`);
        }
        return found;
    }
    async create(createPaymentDto: CreatePaymentDto) {
        const { name , note } = createPaymentDto;
        const payment = new Payment();
        payment.name = name;
        payment.note = note;
        return await payment.save();
    }
    async update(id: number, updatePaymentDto: UpdatePaymentDto) {
        const { name , note } = updatePaymentDto;
        let payment = await this.findOne(id);
        if (name) {
            payment.name = name;
        }
        if (note){
            payment.note= note;
        }
        await payment.save();
        return payment;
      }
    async delete(id: number) {
       return this.paymentRepository.delete(id);
    }
}
