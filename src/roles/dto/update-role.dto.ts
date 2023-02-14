import { IsOptional } from "class-validator";

export class UpdateRoledto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;
}
