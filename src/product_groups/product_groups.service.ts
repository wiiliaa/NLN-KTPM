import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductGroup } from './product_group.entity';
import { Repository } from 'typeorm';
import { CreateProductGroupDto } from './dto/create-product_group.dto';
import { UpdateProductGroupDto } from './dto/update-product_group.dto';

@Injectable()
export class ProductGroupsService {
    constructor(
        @InjectRepository(ProductGroup) private productGroupRepository: Repository<ProductGroup>
    ) {}

    find() {
        return this.productGroupRepository.find();
    }

    async findById(id: number) {
        const found = await this.productGroupRepository.findOne({ where: { id } });
        if (!found) {
          throw new InternalServerErrorException(`Product Group:${id} non-exist`);
        }
        return found;
    }

    async create(createProductGroupDto: CreateProductGroupDto): Promise<ProductGroup> {
        const { title, type, track_inventory } = createProductGroupDto;
        const productGroup = new ProductGroup();
    
        productGroup.title = title;
        productGroup.type = type;
        productGroup.track_inventory = track_inventory;
    
        await productGroup.save();
    
        return productGroup;
    }

    async update(id: number, updateProductGroupDto: UpdateProductGroupDto) {
        const { title, type, track_inventory } = updateProductGroupDto;
        const productGroup = await this.findById(id);
        
    
        if (title) {
          productGroup.title = title;
        }
        if (type) {
          productGroup.type = type;
        }
        if (track_inventory) {
          productGroup.track_inventory = track_inventory;
        }
        
    
        await productGroup.save();
        return productGroup;
    }

    
    async delete(id: number) {
        let status = true;
        const target = await this.productGroupRepository.delete(id);
        if (!target) {
          status = false;
        }
        return { status };
      }
}
