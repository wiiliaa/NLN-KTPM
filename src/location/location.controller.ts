import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.locationService.findOne(id);
  }

  // @Get()
  // async find() {
  //   return this.locationService.findChildren();
  // }
}
