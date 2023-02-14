import { Controller, Get } from '@nestjs/common';

@Controller('files')
export class FilesController {
  @Get('/')
  async find() {
    return 'hello';
  }
}
