import { IsString, IsNumber, IsBoolean } from "class-validator";

export class DtoRents {
    @IsString()
    nameRent: string
    @IsString()
    address: string
    @IsString()
    addressDetails: string
    @IsNumber()
    typeRent: number;
    @IsNumber()
    rooms: number;
    @IsNumber()
    bathrooms: number;
    @IsNumber()
    hall: number;
    @IsNumber()
    parking: number;
    @IsString()
    info: string
    @IsNumber()
    price: number;
    @IsNumber()
    squareMeters: number;
    @IsString()
    images: string;
    @IsNumber()
    idClient: number;
    @IsNumber()
    idUser: number;

    @IsString()
    urbanization: string
    @IsString()
    avenue: string
    @IsNumber()
    days: number;
}

export class DtoUpdateRent {
    @IsNumber()
    idRent: number;
}