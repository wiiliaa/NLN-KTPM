import { ApiProperty } from '@nestjs/swagger';

export class CreateTransportDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  note: string;
}
