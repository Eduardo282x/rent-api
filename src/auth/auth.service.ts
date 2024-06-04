import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoLogin, Login, UserLogin } from './auth.dtos';
import { Users } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService) {
    }

    async loginAsync(login: Login): Promise<DtoLogin> {
        const findUser: UserLogin = await this.prismaService.users.findFirst({
            where: {
                Email: login.username,
                Password: login.password
            },
            include: {
                roles: true,
            }
        });

        if (!findUser) {
            throw new BadRequestException('Usuario no encontrado')
        }

        const response: DtoLogin = {
            message: `Bienvenido ${findUser.Name}`,
            token: findUser,
            success: true,
            statusCode: 200
        }

        return response;
    }
}
