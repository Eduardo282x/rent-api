import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoUsers } from './users.dto';

@Injectable()
export class UsersService {

    constructor(private prismaService: PrismaService){}

    async getAllUsers(): Promise<DtoUsers[]>{
        const getUsers: Users[] = await this.prismaService.users.findMany({
            include: {
                roles: true
            }
        });

        const usersParse: any[] = getUsers;

        usersParse.map(us => {
            us.rolDes = us.roles.Rol
            delete us.roles
        });

        return usersParse;
    }
}
