import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoEditUser, DtoNewUser, DtoUsers } from './users.dto';
import { DtoBaseResponse } from 'src/dtos/base-response';
import { baseResponse } from 'src/dtos/baseResponse';

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

    async postNewUsers(newUser: DtoNewUser): Promise<DtoBaseResponse>{
        const createUser = await this.prismaService.users.create({
            data: {
                name: newUser.name,
                lastname: newUser.lastname,
                identify: newUser.identify,
                email: newUser.email,
                phone: newUser.phone,
                rol: newUser.rol,
                civil: newUser.civil,
                password: '12345678'
            }
        });

        if(!createUser){
            throw new BadRequestException('Error al crear usuario.');
        }

        baseResponse.message = 'Usuario registrado.';

        return baseResponse;
    }

    async postNewUsersReturn(newUser: DtoNewUser): Promise<DtoEditUser>{
        const createUser = await this.prismaService.users.create({
            data: {
                name: newUser.name,
                lastname: newUser.lastname,
                identify: newUser.identify,
                email: newUser.email,
                phone: newUser.phone,
                rol: newUser.rol,
                civil: newUser.civil,
                password: '12345678'
            }
        });

        if(!createUser){
            throw new BadRequestException('Error al crear usuario.');
        }

        return createUser;
    }

    async putUsers(user: DtoEditUser): Promise<DtoBaseResponse>{
        const findUser = await this.prismaService.users.update({
            data: {
                name: user.name,
                lastname: user.lastname,
                identify: user.identify,
                email: user.email,
                phone: user.phone,
                civil: user.civil,
            },
            where: {
                idUsers: Number(user.idUsers)
            }
        });

        if(!findUser){
            throw new BadRequestException('No se encontro un usuario.');
        }

        baseResponse.message = 'Usuario actualizado.';

        return baseResponse;
    }
}
