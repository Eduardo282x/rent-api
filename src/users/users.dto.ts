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
}
export class DtoNewUser extends DtoEditUser {
    @IsNumber()
    rol: number;
}
