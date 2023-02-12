import { Module } from '@nestjs/common';
import { GhnService } from './ghn.service';

@Module({
  providers: [GhnService]
})
export class GhnModule {}
