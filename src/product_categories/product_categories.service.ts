import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './product_categories.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import Slug from "limax";
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class ProductCategoriesService {
    constructor(
        @InjectRepository(ProductCategory) private ProductCategoryRepository: Repository<ProductCategory>
    ){}
    
    find(){
        return this.ProductCategoryRepository.find();
    }

    async findById(id: number) {
        const found = await this.ProductCategoryRepository.findOne({ where: { id } });
        return found;
    }

    async update(id: number, updateCategory : UpdateCategoryDto){
        const {name, description} = updateCategory;

        let productcategory = await this.findById(id);
        const slug = Slug(name);

        if(name){
            productcategory.name = name;
            productcategory.slug = slug;
        }
        if(description){
            productcategory.description = description;
        }

        await productcategory.save();
        return productcategory;
    }

    async create(createCategoryDto : CreateCategoryDto): Promise<ProductCategory>{
        let {name, description} = createCategoryDto;
        const slug = Slug(name);
        let productcategory = new ProductCategory();

        productcategory.name = name;
        productcategory.slug = slug;
        productcategory.description = description;

        await productcategory.save();
        
        return productcategory;
    }

    async delete(id: number) {
        let status = true;
        const target = await this.ProductCategoryRepository.delete(id)
        if(!target){
            status = false;
        }  
        return {status};
    }



}
