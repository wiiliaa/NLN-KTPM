import { IsOptional } from "class-validator";

export class UpdatePaymentOrderDto {
  @IsOptional()
  amount: number;

  @IsOptional()
  date: Date;

  @IsOptional()
  pay_id: string;
}
