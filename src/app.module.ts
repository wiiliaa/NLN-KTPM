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
import { ProductsModule } from './products/products.module';
import { ProductMetasModule } from './product_metas/product_metas.module';
import { RolesModule } from './roles/roles.module';
import { StatusModule } from './status/status.module';
import { TransportsModule } from './transports/transports.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart_items/cart_items.module';
import { ProductGroupsModule } from './product_groups/product_groups.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductMetasModule,
    ProductsModule,
    FilesModule,
    RolesModule,
    DiscountsModule,
    TransportsModule,
    AuthModule,
    CommentsModule,
    OrdersModule,
    CartsModule,
    CartItemsModule,
    ProductGroupsModule,
    UsersModule,
    PaymentsModule,
    OrdersModule,
    StatusModule,

  ],
})
export class AppModule { }
