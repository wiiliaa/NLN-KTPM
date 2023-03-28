import { Module } from '@nestjs/common';
import { TransportationService } from './transportation.service';
import { TransportationController } from './transportation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transportation } from './transportation.entity';

@Module({
  providers: [TransportationService],
  controllers: [TransportationController],
  imports: [TypeOrmModule.forFeature([Transportation])],
})
export class TransportationModule { }
