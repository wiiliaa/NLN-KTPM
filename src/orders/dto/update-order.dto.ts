import { IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  note: string;

  @IsOptional()
  ordercode: string;
}
