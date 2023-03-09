import { Module } from '@nestjs/common';
import { ProductGroupsController } from './product_groups.controller';
import { ProductGroupsService } from './product_groups.service';
import { ProductGroup } from './product_group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProductGroupsController],
  providers: [ProductGroupsService],
  imports: [TypeOrmModule.forFeature([ProductGroup])],
  exports: [ProductGroupsService],
})
export class ProductGroupsModule {}
