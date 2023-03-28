import { Injectable } from '@nestjs/common';
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

  find() {
    return this.productCategoryRepository.find();
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
