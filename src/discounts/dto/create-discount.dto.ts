import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty()
  @IsString()
  coupon: string;

  @ApiProperty()
  @IsNumber()
  limit: number;

  @ApiProperty()
  @IsNumber()
  percent: number;

  @ApiProperty()
  @IsString()
  note: string;
}
