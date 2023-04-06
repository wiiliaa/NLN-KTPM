import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GhnService } from './ghn.service';

@ApiTags('GHN')
@Controller('ghn')
export class GhnController {
  constructor(private ghnService: GhnService) { }

  @ApiResponse({
    status: 200,
    description: 'Check cost address=48 Bùi Thị Xuân Q1 TP Hồ Chí Minh',
  })
  @Get('/check-cost')
  async checkCost(@Query('address') address: string) {
    const cost = this.ghnService.checkCost(address);
    return {
      cost,
    };
  }
}
