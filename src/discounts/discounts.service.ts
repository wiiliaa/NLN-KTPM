import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './discounts.entity';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) { }

  async find() {
    return this.discountRepository.find();
  }

  async findOne(id: number) {
    const found = await this.discountRepository.findOne({ where: { id } });

    if (!found) {
      throw new BadRequestException(`Discount:${id} non exist`);
    }
    return found;
  }

  async create(createDiscountDto: CreateDiscountDto) {
    const { coupon, limit, percent, note } = createDiscountDto;

    const discount = new Discount();
    discount.coupon = coupon;
    discount.limit = limit;
    discount.percent = percent;
    discount.note = note;
    await discount.save();
    return discount;
  }
}
