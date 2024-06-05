import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { DtoUsers } from './users.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get()
    async getUsers(): Promise<DtoUsers[]> {
        return this.usersService.getAllUsers();
    }

}
