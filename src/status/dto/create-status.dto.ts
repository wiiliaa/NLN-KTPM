import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    target: string;
}
