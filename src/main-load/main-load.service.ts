import { Injectable } from '@nestjs/common';
import { DtoBaseResponse } from 'src/dtos/base-response';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MainLoadService {

    constructor(private prismaService: PrismaService){
    }
    async mainLoad(): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.roles.createMany({
                data: [
                    { Rol: 'Administrador' },
                    { Rol: 'Vendedor' },
                    { Rol: 'Cliente' },
                ]
            });

            await this.prismaService.users.createMany({
                data: [
                    {
                        Name: 'admin',
                        Lastname: 'admin',
                        Identify: '28391325',
                        Password: 'admin',
                        Address: 'admin@gmail.com',
                        Phone: '+584165610813',
                        Rol: 1
                    },
                    {
                        Name: 'Vendedor',
                        Lastname: 'Perez',
                        Identify: '28391325',
                        Password: '123',
                        Address: 'vendedor@gmail.com',
                        Phone: '+584121222012',
                        Rol: 2
                    },
                    {
                        Name: 'Cliente',
                        Lastname: 'Gonzales',
                        Identify: '987654321',
                        Password: '123',
                        Address: 'cliente@gmail.com',
                        Phone: '+589863254',
                        Rol: 3
                    },
                ]
            });

            await this.prismaService.type.createMany({
                data: [
                    {
                        NameType: 'Casa'
                    },
                    {
                        NameType: 'Edificio'
                    }
                ]
            });

            await this.prismaService.state.createMany({
                data: [
                    {
                        State: 'En progreso'
                    },
                    {
                        State: 'Finalizado'
                    }
                ]
            });


            await this.prismaService.rent.createMany({
                data: [
                    {
                        NameRent: 'Casa N°1',
                        AddressRent: 'Dirección de la casa',
                        TypeRent: 1,
                        Images: 'https://casallasduque.com/wp-content/uploads/2022/07/remodelacion-apartamentos-montearrollo-comedor-1024x683.jpg'
                    },
                    {
                        NameRent: 'Apartamento',
                        AddressRent: 'Dirección 5 de Julio con Bella vista',
                        TypeRent: 2,
                        Images: 'https://www.shutterstock.com/image-photo/new-modern-apartment-buildings-vancouver-600nw-2326087651.jpg'
                    }
                ]
            });

            const response: DtoBaseResponse = {
                success: true,
                message: `Se ha cargado correctamente todos los datos`,
                statusCode: 200
            }
            
            return response;
        }
        catch (err) {
            const response: DtoBaseResponse = {
                success: false,
                message: `Ha ocurrido un error inespedaro ${err}`,
                statusCode: 400
            }
            return response;
        }

    }
}
