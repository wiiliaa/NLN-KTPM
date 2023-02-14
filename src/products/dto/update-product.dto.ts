import { IsOptional } from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  name: string;

  @IsOptional()
  slug: string;

  @IsOptional()
  price: number;

  @IsOptional()
  length: number;

  @IsOptional()
  weight: number;

  @IsOptional()
  width: number;

  @IsOptional()
  height: number;

  @IsOptional()
  description: string;
}
