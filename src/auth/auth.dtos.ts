import { IsNumber, IsString } from "class-validator";
import { DtoBaseResponse } from "src/dtos/base-response";

export class Login{
    @IsString()
    username: string;
    @IsString()
    password: string;
}

export class UserLogin {
    @IsNumber()
    IdUsers: number;
    @IsString()
    Name: string;
    @IsString()
    Lastname: string;
    @IsString()
    Identify: string;
    @IsString()
    Email: string;
    @IsString()
    Phone: string;
    @IsNumber()
    Rol: number;
}

export class DtoLogin extends DtoBaseResponse{
    token: UserLogin
}