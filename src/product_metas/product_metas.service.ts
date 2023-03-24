import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetatDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
import { ProductMeta } from './product-metas.entity';

@Injectable()
export class ProductMetasService {
  constructor(
    @InjectRepository(ProductMeta)
    private ProductMetaRepository: Repository<ProductMeta>,
  ) { }

  find() {
    return this.ProductMetaRepository.find();
  }

  async findById(id: number) {
    const found = await this.ProductMetaRepository.findOne({ where: { id } });
    if (!found) {
      throw new InternalServerErrorException(`Meta:${id} non-exist`);
    }
    return found;
  }

  async create(createMetaDto: CreateMetatDto) {
    const { name, value, product } = createMetaDto;
    const meta = new ProductMeta();

    meta.name = name;
    meta.value = value;
    meta.product = product;

    await meta.save();

    return meta;
  }

  async update(id: number, updateMetaDto: UpdateMetaDto) {
    const { name, value } = updateMetaDto;

    const meta = await this.findById(id);

    if (name) {
      meta.name = name;
    }
    if (value) meta.value = value;

    await meta.save();
    return meta;
  }

  async delete(id: number) {
    let status = true;
    const target = await this.ProductMetaRepository.delete(id);
    if (!target) {
      status = false;
    }
    return { status };
  }
}
