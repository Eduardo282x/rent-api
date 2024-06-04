import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './auth.dtos';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){
    }

    @Post() 
    async auth(@Body() login: Login): Promise<any> {
        return await this.authService.loginAsync(login);
    }
}
