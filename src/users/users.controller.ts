import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('')
  async find() {
    return this.usersService.find();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOneBy(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
