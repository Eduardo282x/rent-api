import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Backup, Login } from './auth.dtos';
import { DtoBaseResponse } from 'src/dtos/base-response';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){
    }

    @Post() 
    async auth(@Body() login: Login): Promise<any> {
        return await this.authService.loginAsync(login);
    }

    @Post('/backup') 
    async backup(@Body() backup: Backup): Promise<DtoBaseResponse> {
        return await this.authService.backupasync(backup);
    }
}
