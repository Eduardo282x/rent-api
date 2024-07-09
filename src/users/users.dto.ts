import { IsNumber, IsString } from "class-validator";

export class DtoUsers {
    IdUsers:  number;
    Name:     string;
    Lastname: string;
    Identify: string;
    Email:    string;
    Phone:    string;
    Password: string;
    Rol:      number;
    rolDes:   string;
}
export class DtoEditUser {
    @IsString()
    name: string;
    @IsString()
    lastname: string;
    @IsString()
    identify: string;
    @IsString()
    email: string;
    @IsString()
    phone: string;
    @IsString()
    civil: string;
    @IsNumber()
    idUsers: number;
}
export class DtoNewUser {
    @IsNumber()
    rol: number;
    @IsString()
    name: string;
    @IsString()
    lastname: string;
    @IsString()
    identify: string;
    @IsString()
    email: string;
    @IsString()
    phone: string;
    @IsString()
    civil: string;
}