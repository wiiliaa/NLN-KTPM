import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { typeOrmConfig } from "./config/TypeOrm.config";
import { StatusModule } from "./status/status.module";
import { FilesModule } from "./files/files.module";
import { DiscountsModule } from "./discounts/discounts.module";
import { RolesModule } from "./roles/roles.module";
import { ProductsModule } from "./products/products.module";
import { ProductMetasModule } from "./product_metas/product_metas.module";
import { ProductCategoriesModule } from "./product_categories/product_categories.module";
import { TransportsModule } from "./transports/transports.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    StatusModule,
    FilesModule,
    DiscountsModule,
    RolesModule,
    ProductsModule,
    ProductMetasModule,
    ProductCategoriesModule,
    TransportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
