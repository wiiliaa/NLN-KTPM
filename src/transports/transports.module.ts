import { Module } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { TransportsController } from './transports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transport } from './transports.entity';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  providers: [TransportsService],
  controllers: [TransportsController],
  imports: [TypeOrmModule.forFeature([Transport]), AuthModule],
})
export class TransportsModule { }
