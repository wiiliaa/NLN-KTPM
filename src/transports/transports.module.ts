import { Module } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { TransportsController } from './transports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transport } from './transports.entity';

@Module({
  providers: [TransportsService],
  controllers: [TransportsController],
  imports: [TypeOrmModule.forFeature([Transport])],
})
export class TransportsModule { }
