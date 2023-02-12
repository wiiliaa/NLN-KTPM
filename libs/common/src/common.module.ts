import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { GhnModule } from './ghn/ghn.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [GhnModule],
})
export class CommonModule {}
