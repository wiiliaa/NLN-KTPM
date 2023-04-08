import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './product_categories.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import Slug from 'limax';
import { CreateCategoryDto } from './dto/create-category.dto';
import { slugifyVietnamese } from '@src/common/utils/slug';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) { }

  async find() {
    const items = await this.productCategoryRepository.find();
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item) {
        item.children = await this.findChildren(item.id);
      }
    }
    return items;
  }

  async findById(id: number) {
    const found = await this.productCategoryRepository.findOne({
      where: { id },
    });
    if (found?.parent_id) {
      found.parent = await this.findById(found.parent_id);
    }
    found.children = await this.productCategoryRepository.find({
      where: {
        parent_id: found.id,
      },
    });
    return found;
  }
  async findBySlug(slug: string) {
    const found = await this.productCategoryRepository.findOne({
      where: { slug },
    });
    if (!found) {
      throw new InternalServerErrorException(`Category:${slug} non-exist`);
    }
    if (found?.parent_id) {
      found.parent = await this.findById(found.parent_id);
    }
    found.children = await this.productCategoryRepository.find({
      where: {
        parent_id: found.id,
      },
    });
    return found;
  }

  async findChildren(id: number) {
    const found = await this.productCategoryRepository.find({
      where: {
        parent_id: id,
      },
    });
    return found;
  }

  async update(id: number, updateCategory: UpdateCategoryDto) {
    const { name, description } = updateCategory;

    const productcategory = await this.findById(id);
    const slug = Slug(name);

    if (name) {
      productcategory.name = name;
      productcategory.slug = slug;
    }
    if (description) {
      productcategory.description = description;
    }

    await productcategory.save();
    return productcategory;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<ProductCategory> {
    const { name, description, parentId, level } = createCategoryDto;
    const slug = slugifyVietnamese(name);
    const productcategory = new ProductCategory();

    productcategory.name = name;
    productcategory.slug = slug;
    productcategory.description = description;
    productcategory.parent_id = parentId;
    productcategory.level = level;

    await productcategory.save();

    return productcategory;
  }

  async delete(id: number) {
    let status = true;
    const target = await this.productCategoryRepository.delete(id);
    if (!target) {
      status = false;
    }
    return { status };
  }
}
