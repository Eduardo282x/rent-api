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
                    { rol: 'Administrador' },
                    { rol: 'Vendedor' },
                    { rol: 'Cliente vendedor' },
                    { rol: 'Cliente comprador' },
                ]
            });

            await this.prismaService.users.createMany({
                data: [
                    {
                        name: 'admin',
                        lastname: 'admin',
                        identify: '28391325',
                        password: 'admin',
                        email: 'admin@gmail.com',
                        phone: '+584165610813',
                        civil: 'Soltero',
                        rol: 1
                    },
                    {
                        name: 'Vendedor',
                        lastname: 'Perez',
                        identify: '28391325',
                        password: '123',
                        email: 'vendedor@gmail.com',
                        phone: '+584121222012',
                        civil: 'Soltero',
                        rol: 2
                    },
                    {
                        name: 'Cliente',
                        lastname: 'Gonzales',
                        identify: '987654321',
                        password: '123',
                        email: 'cliente@gmail.com',
                        phone: '+589863254',
                        civil: 'Soltero',
                        rol: 3
                    },
                    {
                        name: 'Dueño 1',
                        lastname: 'Casa',
                        identify: '987654322',
                        password: '123',
                        email: 'cliente2@gmail.com',
                        phone: '+589863254',
                        civil: 'Soltero',
                        rol: 3
                    },
                    {
                        name: 'Dueño 2',
                        lastname: 'Apartamento',
                        identify: '987654323',
                        password: '123',
                        email: 'cliente3@gmail.com',
                        phone: '+589863254',
                        civil: 'Soltero',
                        rol: 3
                    },
                ]
            });

            await this.prismaService.type.createMany({
                data: [
                    {
                        nameType: 'Casa'
                    },
                    {
                        nameType: 'Apartamento'
                    }
                ]
            });

            await this.prismaService.state.createMany({
                data: [
                    {
                        state: 'En progreso'
                    },
                    {
                        state: 'Finalizado'
                    }
                ]
            });

            await this.prismaService.rent.createMany({
                data: [
                    {
                        nameRent: 'Casa N°1',
                        address: 'Dirección de la casa',
                        addressDetails: 'Sector la Macandona, Urbenizacion Jazmin, Calle 3, Casa # 17',
                        typeRent: 1,
                        rooms: 2,
                        bathrooms: 2,
                        parking: 1,
                        hall: 2,
                        north: -14.2658,
                        south: 14.3659,
                        east: 485.369,
                        west: 14.3256,
                        info: 'Recien hecha',
                        squareMeters: 230,
                        price: 12000,
                        idClient: 4,
                        autorizationId: 1,
                        autorizated: true,
                        images: 'https://casallasduque.com/wp-content/uploads/2022/07/remodelacion-apartamentos-montearrollo-comedor-1024x683.jpg'
                    },
                    {
                        nameRent: 'Apartamento',
                        address: 'Dirección 5 de Julio con Bella vista',
                        addressDetails: 'Sector la Macandona, Urbenizacion Jazmin, Calle 3, Casa # 17',
                        typeRent: 2,
                        rooms: 5,
                        bathrooms: 4,
                        parking: 1,
                        hall: 2,
                        north: -14.2658,
                        south: 14.3659,
                        east: 485.369,
                        west: 14.3256,
                        info: 'Recien hecha',
                        squareMeters: 600,
                        price: 18000,
                        idClient: 5,
                        autorizationId: 1,
                        autorizated: true,
                        images: 'https://www.shutterstock.com/image-photo/new-modern-apartment-buildings-vancouver-600nw-2326087651.jpg'
                    },
                    {
                        nameRent: 'Apartamento pequeño',
                        address: 'Cecilio acosta',
                        addressDetails: 'Sector la Macandona, Urbenizacion Jazmin, Calle 3, Casa # 17',
                        typeRent: 2,
                        rooms: 3,
                        bathrooms: 2,
                        parking: 1,
                        hall: 2,
                        north: -14.2658,
                        south: 14.3659,
                        east: 485.369,
                        west: 14.3256,
                        info: 'Recien hecha',
                        squareMeters: 200,
                        price: 8000,
                        idClient: 5,
                        autorizationId: null,
                        autorizated: false,
                        images: 'https://cdn.pixabay.com/photo/2013/11/13/21/14/san-francisco-210230_640.jpg'
                    },
                    {
                        nameRent: 'Casa lujosa',
                        address: 'Bella vista',
                        addressDetails: 'Sector la Macandona, Urbenizacion Jazmin, Calle 3, Casa # 17',
                        typeRent: 1,
                        rooms: 5,
                        bathrooms: 4,
                        parking: 1,
                        hall: 2,
                        north: -14.2658,
                        south: 14.3659,
                        east: 485.369,
                        west: 14.3256,
                        info: 'Recien hecha',
                        squareMeters: 350,
                        price: 350000,
                        idClient: 5,
                        autorizationId: null,
                        autorizated: false,
                        images: 'https://assets.easybroker.com/property_images/1445843/21613488/EB-EN5843.jpg?version=1581143120'
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
