import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './files.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) { }

  async find() {
    return this.fileRepository.find();
  }

  async findOne(id: number) {
    const found = await this.fileRepository.findOne({ where: { id } });

    if (!found) {
      throw new BadRequestException(`File:${id} non-exist`);
    }
    return found;
  }
}
