import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '@src/auth/get-user.decorator';
import { User } from '@src/auth/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @Get('')
  async find() {
    return this.usersService.find();
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOneBy(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @Post('/me')
  @UseGuards(AuthGuard())
  async update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.usersService.update(user, updateUserDto);
  }
}
