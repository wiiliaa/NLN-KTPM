import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    UseGuards,
    Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusService } from './status.service';
@Controller('status')
export class StatusController {
    constructor(private statusService: StatusService) { }

    @Get()
    async find() {
        return this.statusService.find();
    }
    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return this.statusService.findOne(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    @ApiResponse({
        status: 201,
        description: 'Create status',
        type: CreateStatusDto,
    })
    async create(
        @GetUser() user: User,
        @Body() updateStatusDto: CreateStatusDto,
    ) {
        return this.statusService.create(user, updateStatusDto);
    }

    @Put('/:id')
    @ApiResponse({
        status: 200,
        description: 'Update status',
        type: UpdateStatusDto,
    })
    async update(
        @Param('id') id: number,
        @Body() updateStatusDto: UpdateStatusDto,
    ) {
        return this.statusService.update(id, updateStatusDto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @GetUser() user: User) {
        return this.statusService.delete(id, user);
    }
}
