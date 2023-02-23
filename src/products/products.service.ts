import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import Slug from 'limax';
import slugify from 'slugify';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) { }

  find() {
    return this.productRepository.find();
  }

  async findById(id: number) {
    const found = await this.productRepository.findOne({
      where: { id },
      relations: { comments: true },
    });
    if (!found) {
      throw new InternalServerErrorException(`Product:${id} non-exist`);
    }
    return found;
  }

  async findByName(name: string) {
    const found = await this.productRepository
      .createQueryBuilder('Product')
      .where('Product.name like :name', { name: `%${name}%` })
      .getMany();

    if (!found) {
      throw new InternalServerErrorException(`Product: ${name} non-exist`);
    }
    return found;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, weight, description } = createProductDto;
    const slug = slugify(name);
    const product = new Product();

    product.name = name;
    product.slug = slug;
    product.price = price;
    product.weight = weight;
    product.description = description;

    await product.save();

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { name, price, weight, description } = updateProductDto;
    const product = await this.findById(id);
    const slug = slugify(name);

    if (name) {
      product.name = name;
      product.slug = slug;
    }
    if (price) {
      product.price = price;
    }
    if (weight) {
      product.weight = weight;
    }
    if (description) {
      product.description = description;
    }

    await product.save();
    return product;
  }

  async delete(id: number) {
    let status = true;
    const target = await this.productRepository.delete(id);
    if (!target) {
      status = false;
    }
    return { status };
  }
}
