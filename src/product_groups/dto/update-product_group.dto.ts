import { IsOptional } from "class-validator";

export class UpdateProductGroupDto {
    @IsOptional()
    title: string;

    @IsOptional()
    type: string; 

    @IsOptional()
    track_inventory: boolean;
}