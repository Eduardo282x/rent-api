import { BadRequestException, Injectable } from '@nestjs/common';
import { Rent, Type } from '@prisma/client';
import { DtoBaseResponse } from 'src/dtos/base-response';
import { baseResponse } from 'src/dtos/baseResponse';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoRentAutorization, DtoRents, DtoUpdateRent } from './rent.dtos';

const PDFDocument = require('pdfkit')

@Injectable()
export class RentService {

    constructor(private prismaService: PrismaService) { }

    async getAllRents(): Promise<Rent[]> {

        return await this.prismaService.rent.findMany({
            include: {
                typerent: true,
                client: true,
                autorization: true
            }
        });
    }
    async getAllRentsAvalibles(): Promise<Rent[]> {
        return await this.prismaService.rent.findMany({
            include: {
                typerent: true
            },
            where: {
                autorizationId: {
                    not: null
                },
                autorizated: true
            }
        });
    }
    async getAllRentsUnavalibles(): Promise<Rent[]> {
        return await this.prismaService.rent.findMany({
            include: {
                typerent: true
            },
            where: {
                autorizationId: null
            }
        });
    }
    async getOneRents(id: string): Promise<Rent> {
        const oneRent = await this.prismaService.rent.findUnique({
            where: {
                idRent: Number(id)
            },
            include: {
                typerent: true,
                client: true
            }
        });

        if (!oneRent) {
            throw new BadRequestException(`No se encontro el registro con el id ${id}`);
        }

        return oneRent;
    }

    async postNewRent(rent: DtoRents): Promise<Buffer> {
        const createRent = await this.prismaService.rent.create({
            data: {
                nameRent: rent.nameRent,
                address: rent.address,
                addressDetails: rent.addressDetails,
                typeRent: rent.typeRent,
                rooms: rent.rooms,
                bathrooms: rent.bathrooms,
                hall: rent.hall,
                parking: rent.parking,
                north: rent.north,
                east: rent.east,
                west: rent.west,
                south: rent.south,
                info: rent.info,
                price: rent.price,
                squareMeters: rent.squareMeters,
                images: rent.images,
                idClient: rent.idClient,
                avenue: rent.avenue,
                urbanization: rent.urbanization,
                days: rent.days,
                date: new Date(),
                autorizationId: null,
                autorizated: false
            }
        });

        if (!createRent) {
            throw new BadRequestException(`No se pudo registrar la propiedad.`);
        }

        return this.getPdfDownload(createRent.idRent.toString());

        // baseResponse.message = 'Propiedad registrada exitosamente.';

        // return baseResponse;
    }

    async putUpdateRent(rent: DtoUpdateRent): Promise<DtoBaseResponse> {
        const autorization = await this.prismaService.users.findFirst({
            where: {
                idUsers: rent.autorizationId
            }
        });

        if (autorization && autorization.rol != 1) {
            throw new BadRequestException('No posee permisos para realizar esta accion.')
        }

        const createRent = await this.prismaService.rent.update({
            data: {
                nameRent: rent.nameRent,
                address: rent.address,
                addressDetails: rent.addressDetails,
                typeRent: rent.typeRent,
                rooms: rent.rooms,
                bathrooms: rent.bathrooms,
                hall: rent.hall,
                parking: rent.parking,
                north: rent.north,
                east: rent.east,
                west: rent.west,
                south: rent.south,
                info: rent.info,
                price: rent.price,
                squareMeters: rent.squareMeters,
                images: rent.images,
                idClient: rent.idClient,
                autorizationId: rent.autorizationId,
                avenue: rent.avenue,
                urbanization: rent.urbanization,
                days: rent.days
            },
            where: {
                idRent: rent.idRent
            }
        });

        if (!createRent) {
            throw new BadRequestException(`No se pudo actualizar la propiedad.`);
        }

        baseResponse.message = 'Propiedad actualizada exitosamente.';

        return baseResponse;
    }

    async autorizationRent(rent: DtoRentAutorization): Promise<DtoBaseResponse> {
        const autorization = await this.prismaService.users.findFirst({
            where: {
                idUsers: rent.autorizationId
            }
        });

        if (autorization && autorization.rol != 1) {
            throw new BadRequestException('No posee permisos para realizar esta accion.')
        }

        const createRent = await this.prismaService.rent.update({
            data: {
                autorizationId: rent.autorizationId,
                autorizated: rent.autorization
            },
            where: {
                idRent: rent.idRent
            }
        });

        if (!createRent) {
            throw new BadRequestException(`No se pudo actualizar la propiedad.`);
        }

        baseResponse.message = 'Propiedad actualizada exitosamente.';

        return baseResponse;
    }

    async getTypes(): Promise<Type[]> {
        return await this.prismaService.type.findMany();
    }
    async getLocations(): Promise<Rent[]> {
        return await this.prismaService.rent.findMany();
    }

    formatNumber(number: number): string {
        number *= 37;
        return `${number.toLocaleString('de-DE')},00`;
    }

    async getPdfDownload(id: string): Promise<Buffer> {
        const oneRent = await this.prismaService.rent.findUnique({
            where: {
                idRent: Number(id)
            },
            include: {
                typerent: true,
                client: true,
                autorization: true
            }
        });

        if (!oneRent) {
            throw new BadRequestException(`No se encontro el registro con el id ${id}`);
        }

        const date = new Date(oneRent.date);
        const day = date.getDate().toString().padStart(2, '0');
        const month: number = date.getMonth();
        const monthNames: string[] = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];
        
        let nameAuth = '';
        let lastnamenameAuth = '';
        let identifyAuth = '';

        if(oneRent.autorization){
            nameAuth = oneRent.autorization.name;
            lastnamenameAuth = oneRent.autorization.lastname;
            identifyAuth = oneRent.autorization.identify;
        } else {
            nameAuth = 'Sin Autorización';
            lastnamenameAuth ='Sin Autorización';
            identifyAuth ='V-00000000';
        }


        const pdfRent: Buffer = await new Promise(resolve => {
            const doc = new PDFDocument();

            doc.image('src/assests/logo.jpg', {
                width: 120,
                height: 120,
                align: 'center',
                valign: 'center'
            });
            doc.moveDown(8);

            doc.text(`
                    Yo, ${oneRent.client.name} ${oneRent.client.lastname} de Profesión, mayor de edad, de estado civil ${oneRent.client.civil} de nacionalidad venezolano y de este domicilio, titular de la cédula de identidad número ${oneRent.client.identify} por medio de la presente declaración, AUTORIZO a la empresa 'INSICA' representada por el ciudadano ${nameAuth} ${lastnamenameAuth} portador de la cédula de identidad número ${identifyAuth} con carácter de exclusividad para vender un inmueble de mi propiedad ubicado en la Urbanización ${oneRent.urbanization} avenida ${oneRent.avenue} denominado -- por la cantidad convenida de ${this.formatNumber(Number(oneRent.price))} Bs bolívares

                Expresamente convengo en pagarle a la empresa --------- a título de comisión un porcentaje equivalente al -- -- por el monto de la venta.

                Esta autorización tiene un plazo de ${oneRent.days} días a partir de la presente fecha.
                
                Queda entendido que durante la validez de esta autorización, no podré realizar ninguna gestión referente a obtener la venta del pre-nombrado inmueble. En Maracaibo a los ${day} dias del mes de ${monthNames[month]} del año 2024.
                `,
                {
                    align: 'justify',
                    indent: 10
                }
            );

            const footerText = "Edificio Cora, Planta Baja, Calle 80, entre Av. 4 bellavista y Av.3Y San Martin, N°3Y-71, Local N°4 Teléfonos: (0261)3233342 / (0414)6345864 Maracaibo, Edo. Zulia";
            const footerColor = 'gray';

            // Función para agregar el footer
            const addFooter = () => {
                doc.fillColor(footerColor)
                    .fontSize(7)
                    .text(footerText, {
                        align: 'center',
                    });
            };

            // const addFooter = () => {
            //     const footerText = "Edificio Cora, Planta Baja, Calle 80, entre Av. 4 bellavista y Av.3Y San Martin, N°3Y-71, Local N°4 Teléfonos: (0261)3233342 / (0414)6345864 Maracaibo, Edo. Zulia";
            //     const footerColor = 'gray';
            //     const y = doc.page.height - doc.options.margins.bottom;
    
            //     doc.fillColor(footerColor)
            //         .fontSize(10)
            //         .text(footerText, {
            //             align: 'center',
            //             continued: true
            //         });
    
            //     doc.moveTo(doc.options.margins.left, y)
            //         .lineTo(doc.page.width - doc.options.margins.right, y)
            //         .stroke();
            // };

            const addHorizontalLine = () => {
                doc.moveTo(50, doc.y) // Ajusta 50 según el margen izquierdo deseado
                   .lineTo(doc.page.width - 50, doc.y) // Ajusta 50 según el margen derecho deseado
                    .stroke()
                    .fillColor(footerColor)
            };

            addHorizontalLine();

            doc.moveDown();

            // Agregar el footer a la primera página
            addFooter();

            doc.on('pageAdded', addFooter);

            const buffer = [];
            doc.on('data', buffer.push.bind(buffer))
            doc.on('end', () => {
                const data = Buffer.concat(buffer)
                resolve(data)
            })

            doc.end()
        })

        return pdfRent;
    }
}
