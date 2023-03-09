import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import slugify from 'slugify';
import { IProductResult } from './interface/productResult.inteface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) { }

  parseToResult(product: Product): IProductResult {
    let result: IProductResult = {
      product_id: product.id,
      sku: product.slug,
      title: product.name,
      url_key: product.slug,
      has_variants: false,
      item_id: product.id,
      commodity_group: {
        group_id: product.productCategory?.id,
        title: product.productCategory?.name,
        type: 'product',
        track_inventory: true,
      },
      product_metas: product.productMetas,
      price: {
        value: product.price,
        min: product.price,
        max: product.price,
        old: null,
        old_min: product.price,
        old_max: product.price,
        currency_alias: 'vnd',
      },
      props: {
        available_qty: product.qty,
        country_of_origin: null,
        extra: null,
        size: {
          weight: product.weight,
        },
      },
      default_category: {
        category_id: product.productCategory.id,
        title: product.productCategory.name,
        url_key: product.productCategory.slug,
      },
      images: [product.image],
      labels: [
        {
          label_id: 4,
          title: 'Best choice',
          color: '#0e8a16',
          text_color: '#000000',
          icon: null,
        },
      ],
      sort_price: product.price.toString(),
      sort_in_stock: product.qty,
      status: 'published',
      deleted_at: null,
      in_stock: true,
    };
    return result;
  }

  async find() {
    return this.productRepository.find();
  }

  async findById(id: number) {
    const found = await this.productRepository.findOne({ where: { id } });
    if (!found) {
      throw new InternalServerErrorException(`Product:${id} non-exist`);
    }
    return found;
  }

  async findBySlug(slug: string) {
    const found = await this.productRepository.findOne({ where: { slug } });
    if (!found) {
      throw new InternalServerErrorException(`Product:${slug} non-exist`);
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
    const { name, price, weight, description, image } = createProductDto;
    const slug = slugify(name);
    const product = new Product();
    product.name = name;
    product.slug = slug;
    product.price = price;
    product.weight = weight;
    product.description = description;
    product.image = image;
    await product.save();
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .update()
      .set(updateProductDto)
      .where('id = :id', { id })
      .execute();
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
