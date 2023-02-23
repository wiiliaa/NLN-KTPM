import { IsOptional } from 'class-validator';

export class FilterCommentDto {
  @IsOptional()
  rate: number;

  @IsOptional()
  isDESC: boolean;
}
