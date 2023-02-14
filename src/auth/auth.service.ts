import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtSerivce: JwtService
    ) {}


    async signUp(authCredentials: AuthCredentials){
        const { username, password } = authCredentials
        const user = new User()
        user.username = username
        user.password = password
        try{
            await user.save()
        }catch(error){
            if(error.code == 23505){
                throw new ConflictException("username already exist")
            }else{
                throw new InternalServerErrorException()
            }
            console.log(error.code)
        }
        return user
    }

    async signIn(authCredentials: AuthCredentials): Promise<{ accessToken: string}>{
        const username = await this.validateUserPassword(authCredentials)
        const payload: JwtPayload = { username }
        const accessToken = this.jwtSerivce.sign(payload)
        return { accessToken }
    }

    async validateUserPassword(authCredentials: AuthCredentials){
        const { username, password } = authCredentials
        const user = await this.userRepository.findOne({ where: { username } })
        if(user && await user.validatePassword(password)){
            return user.username
        }else{
            throw new UnauthorizedException(`username or password is wrong`)
        }
    }

}
