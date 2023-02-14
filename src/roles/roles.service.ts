import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./roles.entity";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoledto } from "./dto/update-role.dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private RoleRepository: Repository<Role>
  ) {}

  async findByName(name: string): Promise<Role> {
    const found = await this.RoleRepository.findOne({ where: { name } });

    if (!found) {
      throw new InternalServerErrorException(`Role ${name} non-exist`);
    }
    return found;
  }

  async findById(id: number): Promise<Role> {
    const found = await this.RoleRepository.findOne({ where: { id } });

    if (!found) {
      throw new InternalServerErrorException(`Role ${id} non-exist`);
    }
    return found;
  }

  async create(createRoleDtio: CreateRoleDto): Promise<Role> {
    const { name, description } = createRoleDtio;

    const role = new Role();
    role.name = name;
    role.description = description;
    await role.save();
    return role;
  }

  async delete(name: string) {
    return this.RoleRepository.delete(name);
  }

  async update(id: number, updateRoledto: UpdateRoledto) {
    const { name, description } = updateRoledto;
    const role = await this.findById(id);
    if (name) {
      role.name = name;
    }
    if (description) {
      role.description = description;
    }
    await role.save();
    return role;
  }
}
