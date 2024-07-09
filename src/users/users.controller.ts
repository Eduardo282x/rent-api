import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { DtoEditUser, DtoNewUser, DtoUsers } from './users.dto';
import { DtoBaseResponse } from 'src/dtos/base-response';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get()
    async getUsers(): Promise<DtoUsers[]> {
        return await this.usersService.getAllUsers();
    }

    @Post()
    async postUsers(@Body() newUser: DtoNewUser): Promise<DtoBaseResponse> {
        return await this.usersService.postNewUsers(newUser);
    }

    @Post('return')
    async postUsersReturn(@Body() newUser: DtoNewUser): Promise<DtoEditUser> {
        return await this.usersService.postNewUsersReturn(newUser);
    }

    @Put('/:id')
    async putUsers(@Body() editUser: DtoEditUser): Promise<DtoBaseResponse>{
        return await this.usersService.putUsers(editUser);
    }
}
