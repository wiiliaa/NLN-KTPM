import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @ApiProperty()
  note: string;

  @IsOptional()
  @ApiProperty()
  ordercode: string;
}
