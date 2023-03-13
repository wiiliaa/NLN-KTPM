import { IsOptional } from 'class-validator';

export class FilterProductDto {
  @IsOptional()
  page: number = 1;

  @IsOptional()
  text: string;

  @IsOptional()
  limit: number = 20;

  @IsOptional()
  skip: number = 0;
}
