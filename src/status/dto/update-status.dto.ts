import { IsOptional } from "class-validator";

export class UpdateStatusDto {
    @IsOptional()
    name : string;

    @IsOptional()
    description : string;

    @IsOptional()
    target: string;
}