import { ApiProperty } from '@nestjs/swagger';

export class CreateMetatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;
}
