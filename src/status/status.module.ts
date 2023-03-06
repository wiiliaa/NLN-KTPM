import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { Status } from './status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  controllers: [StatusController],
  providers: [StatusService],
  imports: [TypeOrmModule.forFeature([Status]), AuthModule],
})
export class StatusModule { }
