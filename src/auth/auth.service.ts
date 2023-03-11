import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtSerivce: JwtService,
    ) { }

    async signUp(createUserDto: CreateUserDto) {
        const {
            username,
            password,
            fullname,
            birthday,
            email,
            phone,
            address,
            province_name,
            district_name,
            ward_name,
        } = createUserDto;
        const user = new User();
        user.username = username;
        user.password = password;
        user.fullname = fullname;
        user.birthday = birthday;
        user.email = email;
        user.phone = phone;
        user.address = address;
        user.province_name = province_name;
        user.district_name = district_name;
        user.ward_name = ward_name;
        await user.save();
        return user;
    }

    async signIn(
        authCredentials: AuthCredentials,
    ): Promise<{ accessToken: string }> {
        const username = await this.validateUserPassword(authCredentials);
        const payload: JwtPayload = { username };
        const accessToken = this.jwtSerivce.sign(payload);
        return { accessToken };
    }

    async validateUserPassword(authCredentials: AuthCredentials) {
        const { username, password } = authCredentials;
        const user = await this.userRepository.findOne({ where: { username } });
        if (user && (await user.validatePassword(password))) {
            return user.username;
        } else {
            throw new UnauthorizedException(`username or password is wrong`);
        }
    }
}
