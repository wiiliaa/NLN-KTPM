import { IsOptional } from "class-validator";

export class UpdatePaymentDto {
  @IsOptional()
  name: string;

  @IsOptional()
  note: string;
}
