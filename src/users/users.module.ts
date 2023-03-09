import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/auth/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
})
export class UsersModule { }
