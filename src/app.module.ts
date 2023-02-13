import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/TypeOrm.config';
import { StatusModule } from './status/status.module';
import { FilesModule } from './files/files.module';
import { DiscountsModule } from './discounts/discounts.module';
import { TransportModule } from './transport/transport.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    StatusModule,
    FilesModule,
    DiscountsModule,
    TransportModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
