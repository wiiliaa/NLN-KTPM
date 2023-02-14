import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Delete, Put } from "@nestjs/common/decorators";
import { UpdateRoledto } from "./dto/update-role.dto";

@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Get("/:name")
  async findByName(@Param("name") name: string) {
    return this.roleService.findByName(name);
  }

  @Get("/:id")
  async findById(@Param("id") id: number) {
    return this.roleService.findById(id);
  }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Put("/:id")
  async update(@Body() updateRoledto: UpdateRoledto, @Param("id") id: number) {
    return this.roleService.update(id, updateRoledto);
  }

  @Delete("/:name")
  async delete(@Param("name") name: string) {
    return this.roleService.delete(name);
  }
}
