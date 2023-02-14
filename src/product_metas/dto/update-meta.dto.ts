import { IsOptional } from "class-validator";

export class UpdateMetaDto {
  @IsOptional()
  name: string;

  @IsOptional()
  value: string;
}
