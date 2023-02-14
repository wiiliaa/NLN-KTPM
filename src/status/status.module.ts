import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { Status } from './status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [StatusController],
  providers: [StatusService],
  imports: [TypeOrmModule.forFeature([Status])]
})
export class StatusModule {}

