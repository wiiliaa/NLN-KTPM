import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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

  async create(user: User, createDiscountDto: CreateDiscountDto) {
    const { coupon, limit, percent, start, end, note } = createDiscountDto;

    const discount = new Discount();
    discount.coupon = coupon;
    discount.limit = limit;
    discount.percent = percent;
    discount.start = start;
    discount.end = end;
    discount.note = note;
    discount.user = user;
    await discount.save();
    return discount;
  }
}
