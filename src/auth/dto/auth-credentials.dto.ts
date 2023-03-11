import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class AuthCredentials {
    @IsString()
    @MinLength(4)
    @ApiProperty()
    username: string;

    @IsString()
    @MinLength(6)
    @ApiProperty()
    password: string;
}
