import { IsString, IsNumber } from "class-validator";

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
    @IsNumber()
    north: number;
    @IsNumber()
    east: number;
    @IsNumber()
    west: number;
    @IsNumber()
    south: number;
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
}

export class DtoUpdateRent extends DtoRents {
    @IsNumber()
    idRent: number;
}