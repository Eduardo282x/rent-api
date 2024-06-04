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
                        Email: 'admin@gmail.com',
                        Phone: '+584165610813',
                        Rol: 1
                    },
                    {
                        Name: 'Vendedor',
                        Lastname: 'Perez',
                        Identify: '28391325',
                        Password: '123',
                        Email: 'vendedor@gmail.com',
                        Phone: '+584121222012',
                        Rol: 2
                    },
                    {
                        Name: 'Cliente',
                        Lastname: 'Gonzales',
                        Identify: '987654321',
                        Password: '123',
                        Email: 'cliente@gmail.com',
                        Phone: '+589863254',
                        Rol: 3
                    },
                    {
                        Name: 'Dueño 1',
                        Lastname: 'Casa',
                        Identify: '987654322',
                        Password: '123',
                        Email: 'cliente2@gmail.com',
                        Phone: '+589863254',
                        Rol: 3
                    },
                    {
                        Name: 'Dueño 2',
                        Lastname: 'Apartamento',
                        Identify: '987654323',
                        Password: '123',
                        Email: 'cliente3@gmail.com',
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
                        Address: 'Dirección de la casa',
                        AddressDetails: 'Sector la Macandona, Urbenizacion Jazmin, Calle 3, Casa # 17',
                        TypeRent: 1,
                        Rooms: 2,
                        Bathrooms: 2,
                        SquareMeters: 230,
                        Price: 12000,
                        IdClient: 4,
                        Images: 'https://casallasduque.com/wp-content/uploads/2022/07/remodelacion-apartamentos-montearrollo-comedor-1024x683.jpg'
                    },
                    {
                        NameRent: 'Apartamento',
                        Address: 'Dirección 5 de Julio con Bella vista',
                        AddressDetails: 'Sector la Macandona, Urbenizacion Jazmin, Calle 3, Casa # 17',
                        TypeRent: 2,
                        Rooms: 5,
                        Bathrooms: 4,
                        SquareMeters: 600,
                        Price: 18000,
                        IdClient: 5,
                        Images: 'https://www.shutterstock.com/image-photo/new-modern-apartment-buildings-vancouver-600nw-2326087651.jpg'
                    },
                    {
                        NameRent: 'Apartamento pequeño',
                        Address: 'Cecilio acosta',
                        AddressDetails: 'Sector la Macandona, Urbenizacion Jazmin, Calle 3, Casa # 17',
                        TypeRent: 2,
                        Rooms: 3,
                        Bathrooms: 2,
                        SquareMeters: 200,
                        Price: 8000,
                        IdClient: 5,
                        Images: 'https://cdn.pixabay.com/photo/2013/11/13/21/14/san-francisco-210230_640.jpg'
                    },
                    {
                        NameRent: 'Casa lujosa',
                        Address: 'Bella vista',
                        AddressDetails: 'Sector la Macandona, Urbenizacion Jazmin, Calle 3, Casa # 17',
                        TypeRent: 1,
                        Rooms: 5,
                        Bathrooms: 4,
                        SquareMeters: 350,
                        Price: 350000,
                        IdClient: 5,
                        Images: 'https://assets.easybroker.com/property_images/1445843/21613488/EB-EN5843.jpg?version=1581143120'
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
