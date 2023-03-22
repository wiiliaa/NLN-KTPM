import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class AuthCredentials {
    @IsString()
    @MinLength(4)
    @ApiProperty({
        default: 'datbro',
    })
    username: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({
        default: '123123',
    })
    password: string;
}
