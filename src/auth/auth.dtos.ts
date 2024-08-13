import { IsNumber, IsString } from "class-validator";
import { DtoBaseResponse } from "src/dtos/base-response";

export class Login{
    @IsString()
    username: string;
    @IsString()
    password: string;
}

export class Backup{
    @IsString()
    email: string;
    @IsString()
    phone: string;
    @IsString()
    password: string;
}

export class UserLogin {
    @IsNumber()
    idUsers: number;
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
    @IsNumber()
    rol: number;
}

export class DtoLogin extends DtoBaseResponse{
    token: UserLogin
}