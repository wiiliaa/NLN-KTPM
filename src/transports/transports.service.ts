import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransportDto } from './dto/create-transport.dto';
import { Transport } from './transports.entity';

@Injectable()
export class TransportsService {
  constructor(
    @InjectRepository(Transport)
    private transportRepository: Repository<Transport>,
  ) { }

  async create(createTransportDto: CreateTransportDto) {
    return await this.transportRepository.save(createTransportDto);
  }

  async find() {
    return this.transportRepository.find();
  }

  async findOne(id: number) {
    return await this.transportRepository.findOne({ where: { id } });
  }
}
