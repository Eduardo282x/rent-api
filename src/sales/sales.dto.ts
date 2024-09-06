import { Transform } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";

export class BodySale {
    @IsNumber()
    idClient: number;
    @IsNumber()
    idRent: number;
}

export class DtoDateFilter {

    @Transform(({ value }) => new Date(value))
    @IsDate()
    dateStart: Date;

    
    @Transform(({ value }) => new Date(value))
    @IsDate()
    dateEnd: Date;
}