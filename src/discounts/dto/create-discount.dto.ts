import { IsDate, IsNumber, IsString } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
