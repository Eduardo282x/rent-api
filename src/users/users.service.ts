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
                Name: newUser.name,
                Lastname: newUser.lastname,
                Identify: newUser.identify,
                Email: newUser.email,
                Phone: newUser.phone,
                Rol: newUser.rol,
                Civil: newUser.civil,
                Password: '12345678'
            }
        });

        if(!createUser){
            throw new BadRequestException('Error al crear usuario.');
        }

        baseResponse.message = 'Usuario registrado.';

        return baseResponse;
    }

    async putUsers(user: DtoEditUser, idUser: number): Promise<DtoBaseResponse>{
        const findUser = await this.prismaService.users.update({
            data: {
                Name: user.name,
                Lastname: user.lastname,
                Identify: user.identify,
                Email: user.email,
                Phone: user.phone,
                Civil: user.civil,
            },
            where: {
                IdUsers: Number(idUser)
            }
        });

        if(!findUser){
            throw new BadRequestException('No se encontro un usuario.');
        }

        baseResponse.message = 'Usuario actualizado.';

        return baseResponse;
    }
}
