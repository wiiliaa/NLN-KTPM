import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Status } from "./status.entity";
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { User } from "src/auth/user.entity";
import { isAdmin } from "src/common/utils/user";
@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status) private statusRepository: Repository<Status>
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
        if (!isAdmin(user)) {
            throw new InternalServerErrorException("You cant create status");
        }
        const { name, description, target } = createStatusDto;
        const status = new Status();
        status.name = name;
        status.description = description;
        status.target = target;
        return await status.save();
    }
    async update(id: number, user: User, updateStatusDto: UpdateStatusDto) {
        if (!isAdmin(user)) {
            throw new InternalServerErrorException("You Cant update status");
        }
        const { name, description, target } = updateStatusDto;
        let status = await this.findOne(id);
        if (name) {
            status.name = name;
        }
        if (description) {
            status.description = description;
        }
        if (target) {
            status.target = target;
        }
        await status.save();
        return status;
    }
    async delete(id: number, user: User) {
        let status = false;
        if (!isAdmin(user)) {
            throw new InternalServerErrorException("You Cant delete status");
        }
        const target = await this.statusRepository.delete(id);

        if (target) {
            status = true;
        }
        return { status };
    }
}
