import { IsNumber } from "class-validator";

export class BodySale {
    @IsNumber()
    idClient: number;
    @IsNumber()
    idRent: number;
}