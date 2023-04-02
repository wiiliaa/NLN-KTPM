import { Module } from '@nestjs/common';
import { GhnService } from './ghn.service';
import { GhnController } from './ghn.controller';

@Module({
  providers: [GhnService],
  controllers: [GhnController]
})
export class GhnModule {}
