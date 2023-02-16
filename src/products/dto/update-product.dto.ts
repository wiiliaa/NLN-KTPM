import { IsOptional } from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  name: string;

  @IsOptional()
  price: number;

  @IsOptional()
  weight: number;

  @IsOptional()
  width: number;

  @IsOptional()
  height: number;

  @IsOptional()
  description: string;
}
