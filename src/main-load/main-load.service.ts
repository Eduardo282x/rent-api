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
                    { rol: 'Gerente' },
                    { rol: 'Promotor' },
                    { rol: 'Cliente vendedor' },
                    { rol: 'Cliente comprador' },
                ]
            });

            await this.prismaService.users.createMany({
                data: [
                    {
                        name: 'admin',
                        lastname: 'admin',
                        identify: 'V-28391325',
                        password: 'admin',
                        email: 'admin@gmail.com',
                        phone: '04165610813',
                        civil: 'Soltero',
                        rol: 1
                    },
                    {
                        name: 'Vendedor',
                        lastname: 'Perez',
                        identify: 'V-28391325',
                        password: '123',
                        email: 'vendedor@gmail.com',
                        phone: '04121222012',
                        civil: 'Soltero',
                        rol: 2
                    },
                    {
                        name: 'Cliente',
                        lastname: 'Gonzales',
                        identify: 'V-987654321',
                        password: '123',
                        email: 'cliente@gmail.com',
                        phone: '04149863254',
                        civil: 'Soltero',
                        rol: 3
                    },
                    {
                        name: 'Dueño 1',
                        lastname: 'Casa',
                        identify: 'V-987654322',
                        password: '123',
                        email: 'cliente2@gmail.com',
                        phone: '04269863254',
                        civil: 'Soltero',
                        rol: 3
                    },
                    {
                        name: 'Dueño 2',
                        lastname: 'Apartamento',
                        identify: 'V-987654323',
                        password: '123',
                        email: 'cliente3@gmail.com',
                        phone: '04249863254',
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
                        state: 'Creada'
                    },
                    {
                        state: 'Vendida'
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
                        idState: 1,
                        info: 'Recien hecha',
                        squareMeters: 230,
                        price: 12000,
                        idClient: 4,
                        autorizationId: 1,
                        avenue: 'Avenida 108',
                        urbanization: 'La Rotaria',
                        days: 10,
                        date: new Date('2024-04-15'),
                        images: 'Casa1.webp'
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
                        idState: 1,
                        info: 'Recien hecha',
                        squareMeters: 600,
                        price: 18000,
                        idClient: 5,
                        autorizationId: 1,
                        avenue: 'La Limpia',
                        urbanization: 'Curva de Molina',
                        days: 15,
                        date: new Date('2024-06-08'),
                        images: 'Casa2.webp'
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
                        idState: 1,
                        info: 'Recien hecha',
                        squareMeters: 200,
                        price: 8000,
                        idClient: 5,
                        autorizationId: 2,
                        avenue: 'La limpia',
                        urbanization: 'Los olivos',
                        days: 20,
                        date: new Date('2024-02-28'),
                        images: 'san-francisco-210230_640.jpg'
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
                        idState: 1,
                        info: 'Recien hecha',
                        squareMeters: 350,
                        price: 350000,
                        idClient: 5,
                        autorizationId: 2,
                        avenue: 'Circunvalación 3',
                        urbanization: 'Los bucares',
                        days: 30,
                        date: new Date(),
                        images: 'EB-EN5843.jpg'
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
