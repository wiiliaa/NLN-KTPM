import { Module } from '@nestjs/common';
import { ProductMetasController } from './product_metas.controller';
import { ProductMetasService } from './product_metas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMeta } from './product-metas.entity';

@Module({
  controllers: [ProductMetasController],
  providers: [ProductMetasService],
  imports: [TypeOrmModule.forFeature([ProductMeta])],
})
export class ProductMetasModule {}
