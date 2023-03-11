import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Login',
    type: AuthCredentials,
  })
  async login(@Body() authCredentials: AuthCredentials) {
    return this.authService.signIn(authCredentials);
  }

  @Post('/signup')
  @ApiResponse({
    status: 201,
    description: 'Sign up',
    type: CreateUserDto,
  })
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  async getUser(@GetUser() user: User) {
    return { user };
  }
}
