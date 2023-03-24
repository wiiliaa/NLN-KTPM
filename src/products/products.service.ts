import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import slugify from 'slugify';
import { IProductResult } from './interface/productResult.inteface';
import { FilterProductDto } from './dto/filter-product.dto';
import { ProductMetasService } from '@src/product_metas/product_metas.service';
import { CreateMetatDto } from '@src/product_metas/dto/create-meta.dto';

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private productMetaService: ProductMetasService,
  ) { }

  search(filterProductDto: FilterProductDto): Promise<[Product[], number]> {
    const { page, limit, text, skip } = filterProductDto;
    const query = this.productRepository
      .createQueryBuilder('Product')
      .where('Product.name like :name', { name: `%${text}%` })
      .innerJoinAndSelect('Product.productCategory', 'productCategory')
      .innerJoinAndSelect('Product.productMetas', 'productMetas');
    return query.getManyAndCount();
  }

  parseToResult(product: Product): IProductResult {
    if (!product) {
      return null;
    }
    let result: IProductResult = {
      product_id: product.id,
      description: product.description,
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

  async find(
    filterProductDto: FilterProductDto,
  ): Promise<{ products: IProductResult[]; total: number }> {
    let total: number;
    let results: IProductResult[];
    this.logger.verbose(JSON.stringify(filterProductDto));
    if (filterProductDto?.text) {
      let [products, count] = await this.search(filterProductDto);
      results = products.map((product) => this.parseToResult(product));
      total = count;
    } else {
      let [products, count] = await this.productRepository
        .createQueryBuilder()
        .innerJoinAndSelect('Product.productCategory', 'productCategory')
        .innerJoinAndSelect('Product.productMetas', 'productMetas')
        .getManyAndCount();

      this.logger.verbose(JSON.stringify(products));
      results = products.map((product) => this.parseToResult(product));
      total = count;
    }
    return {
      total,
      products: results,
    };
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
    const { name, price, weight, description, image, productMetas } =
      createProductDto;
    const slug = slugify(name);
    const product = new Product();
    product.name = name;
    product.slug = slug;
    product.price = price;
    product.weight = weight;
    product.description = description;
    product.image = image;
    await product.save();
    if (productMetas) {
      for (const productMeta of productMetas) {
        let createMetaDto: CreateMetatDto = {
          name: productMeta.name,
          value: productMeta.value,
          product,
        };
        await this.productMetaService.create(createMetaDto);
      }
    }
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
