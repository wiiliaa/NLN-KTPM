import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './status.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { User } from 'src/auth/user.entity';
import { isAdmin } from 'src/common/utils/user';
@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status) private statusRepository: Repository<Status>,
    ) { }

    find() {
        return this.statusRepository.find();
    }
    async findOne(id: number) {
        const found = await this.statusRepository.findOne({ where: { id } });
        if (!found) {
            throw new InternalServerErrorException(`Status:${id} non exist`);
        }
        return found;
    }
    async create(user: User, createStatusDto: CreateStatusDto) {
        const { name, description, target } = createStatusDto;
        const status = new Status();
        status.name = name;
        status.description = description;
        status.target = target;
        status.user = user;
        return await status.save();
    }
    async update(id: number, updateStatusDto: UpdateStatusDto) {
        return this.statusRepository.update(id, updateStatusDto);
    }
    async delete(id: number, user: User) {
        let status = false;
        if (!isAdmin(user)) {
            throw new InternalServerErrorException('You Cant delete status');
        }
        const target = await this.statusRepository.delete(id);

        if (target) {
            status = true;
        }
        return { status };
    }
}
