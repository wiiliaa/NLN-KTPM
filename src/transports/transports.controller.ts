import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransportDto } from './dto/create-transport.dto';
import { TransportsService } from './transports.service';

@ApiTags('transports')
@UseGuards(AuthGuard())
@Controller('transports')
export class TransportsController {
  constructor(private readonly transportsService: TransportsService) { }

  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @Get()
  getTransports() {
    return this.transportsService.find();
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @Get('/:id')
  getTransportById(@Param('id') id: number) {
    return this.transportsService.findOne(id);
  }

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @Post()
  createTransport(@Body() createTransportDto: CreateTransportDto) {
    return this.transportsService.create(createTransportDto);
  }
}
