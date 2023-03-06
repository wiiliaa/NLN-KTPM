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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusService } from './status.service';
@Controller('status')
export class StatusController {
    constructor(private StatusService: StatusService) { }

    @Get()
    async find() {
        return this.StatusService.find();
    }
    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return this.StatusService.findOne(id);
    }

    @UseGuards(AuthGuard())
    @Post()
    async create(
        @GetUser() user: User,
        @Body() updateStatusDto: CreateStatusDto,
    ) {
        return this.StatusService.create(user, updateStatusDto);
    }
    @Put('/:id')
    async update(
        @Param('id') id: number,
        @Body() updateStatusDto: UpdateStatusDto,
    ) {
        return this.StatusService.update(id, updateStatusDto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @GetUser() user: User) {
        return this.StatusService.delete(id, user);
    }
}
