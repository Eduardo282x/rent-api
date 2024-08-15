import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Backup, DtoLogin, Login, UserLogin } from './auth.dtos';
import { Users } from '@prisma/client';
import { DtoBaseResponse } from 'src/dtos/base-response';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService) {
    }

    async loginAsync(login: Login): Promise<DtoLogin> {
        const findUser: UserLogin = await this.prismaService.users.findFirst({
            where: {
                email: login.username,
                password: login.password,
                rol: {
                    in: [1,2]
                }
            },
            include: {
                roles: true,
            }
        });

        if (!findUser) {
            throw new BadRequestException('Usuario no encontrado')
        }

        const response: DtoLogin = {
            message: `Bienvenido ${findUser.name}`,
            token: findUser,
            success: true,
            statusCode: 200
        }

        return response;
    }

    async backupasync(backup: Backup): Promise<DtoBaseResponse> {
        const findUser = await this.prismaService.users.findFirst({
            where: {
                email: backup.email,
                phone: backup.phone,
                rol: {
                    in: [1,2]
                }
            },
        });

        if (!findUser) {
            const response: DtoBaseResponse = {
                message: `Usuario no encontrado.`,
                success: false,
                statusCode: 400
            }
    
            return response;
        }

        const updatePasswordUser = await this.prismaService.users.update({
            data: {
                password: backup.password
            }, 
            where: {
                idUsers: findUser.idUsers
            }
        });

        const response = {
            message: `Contraseña actualizada`,
            success: true,
            statusCode: 200
        }

        return response;
    }
}

