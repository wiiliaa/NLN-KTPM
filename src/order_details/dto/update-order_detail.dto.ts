import { IsOptional } from "class-validator";

export class UpdateOrderDetailDto {
  @IsOptional()
  price: string;

  @IsOptional()
  date: Date;

  @IsOptional()
  note: string;
}
