import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  async login(@Body() authCredentials: AuthCredentials) {
    return this.authService.signIn(authCredentials);
  }

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentials: AuthCredentials) {
    return this.authService.signUp(authCredentials);
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  async getUser(@GetUser() user: User) {
    return { user };
  }
}
