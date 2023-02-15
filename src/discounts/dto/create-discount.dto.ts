import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  coupon: string;

  @IsNumber()
  limit: number;

  @IsNumber()
  percent: number;

  @IsDate()
  start: Date;

  @IsDate()
  end: Date;

  @IsString()
  note: string;
}
