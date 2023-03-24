import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) { }

  async findOne(id: number) {
    const location = await this.locationRepository
      .createQueryBuilder('parent')
      .innerJoinAndSelect('parent.children', 'children')
      .where('parent.id = :id', { id })
      .getOne();
    return location;
  }

  async findChildren(parentId: number) {
    const location = await this.locationRepository
      .createQueryBuilder('location')
      .where('location.parentId = :id', { id: parentId })
      .getMany();
    return location;
  }
}
