import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { typeOrmConfig } from './config/TypeOrm.config';
import { DiscountsModule } from './discounts/discounts.module';
import { FilesModule } from './files/files.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentOrdersModule } from './payment_orders/payment_orders.module';
import { ProductsModule } from './products/products.module';
import { ProductCategoriesModule } from './product_categories/product_categories.module';
import { ProductMetasModule } from './product_metas/product_metas.module';
import { RolesModule } from './roles/roles.module';
import { StatusModule } from './status/status.module';
import { TransportsModule } from './transports/transports.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductMetasModule,
    ProductsModule,
    ProductCategoriesModule,
    FilesModule,
    RolesModule,
    DiscountsModule,
    TransportsModule,
    AuthModule,
    CommentsModule,
    OrdersModule,
    UsersModule,
    PaymentsModule,
    PaymentOrdersModule,
    OrdersModule,
    StatusModule,
  ],
})
export class AppModule {}
