import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './files.entity';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
  imports: [TypeOrmModule.forFeature([File])],
})
export class FilesModule { }
