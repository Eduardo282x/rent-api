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

    //Compra venta
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

        if (oneRent.autorization) {
            nameAuth = oneRent.autorization.name;
            lastnamenameAuth = oneRent.autorization.lastname;
            identifyAuth = oneRent.autorization.identify;
        } else {
            nameAuth = 'Sin Autorización';
            lastnamenameAuth = 'Sin Autorización';
            identifyAuth = 'V-00000000';
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

    //Venta de la Inmobiliaria
    async getPdfDownloadFinish(id: string): Promise<Buffer> {
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

        const pdfRent: Buffer = await new Promise(resolve => {
            const doc = new PDFDocument();

            doc.font('Helvetica-Oblique').text(`Yo, IVONNE GONZALEZ, venezolana, mayor de edad, soltera, titular de la cédula de identidad Nº.V-5.053.166, actuando en nombre y representación de las ciudadanas DALIDA DEL CARMEN CELIS DE BASABE, venezolana, mayor de edad, viuda, titular de la cédula de identidad N° .V-7.616.675, y ANA DEL CARMEN BASABE CELIS, venezolana, mayor de edad, soltera, titular de la cedula de identidad N° V-10.447.823, según se evidencia de Poder General de Administración y Disposición, otorgado en el Estado de Florida, el día 15 de septiembre de 2.021, por ante el Notario Público, AIXA DAMARIS AVILES, Commission #HH 023658, el cual fue apostillado el día 3 de octubre de 2.021, ante la Secretaria del Estado de Florida, N° 2021-138640, y posteriormente Protocolizado por ante el Registro Público del Tercer Circuito del Municipio Maracaibo del Estado Zulia, el día 16 de Noviembre de 2.021, anotado bajo el N° 12, Folio 12013, Tomo 19, del Protocolo de Transcripción del año 2.021; por medio del presente documento declaro: En nombre de mis mandantes doy en venta pura y simple, perfecta e irrevocable, libre de todo gravamen y sin condición alguna, a los ciudadanos RONNY JESUS PACHECO MARQUEZ, venezolano, mayor de edad, soltero, titular de la cédula de identidad N° V-17.735.058 y NOREXCY CAROLINA HERNANDEZ GALLARDO, venezolana, mayor de edad, soltera, titular de la cédula de identidad N° V-19.546.087, de este mismo domicilio; un inmueble de la única y exclusiva propiedad de mis mandantes, constituido por una casa quinta compuesta de porche, sala, comedor, corredor, tres (3) dormitorios, cocina, una sala sanitaria, lavandería, una sala sanitaria en el patio trasero anexo a la lavandería y un depósito, construida con paredes de bloques frisados, techos de platabanda y zinc y pisos de cerámica, totalmente cercada con bahareque y cerca de hierro en su frente, ubicada en el Sector Sabaneta, avenida 21A, Casa N° 100-304, en jurisdicción de la parroquia Cristo de Aranza del Estado Zulia. La parcela de terreno donde se encuentra construida la casa objeto de esta venta, tiene una superficie aproximada de DOSCIENTOS CINCUENTA Y TRES METROS CUADRADOS CON OCHENTA Y NUEVE DECIMETROS CUADRADOS (253,89Mts2), y se encuentra comprendida dentro  de los siguientes linderos: NORTE: Linda con propiedad que eso fue Ángel Fuenmayor, casa N° 100-294; SUR: Linda con propiedad que eso fue de Lina Leal, casa N° 100-310; ESTE: Linda con la avenida 21A; y por el OESTE: Linda con propiedad que eso fue de Nila de Fuenmayor, casa N° 30-64. Dicho inmueble le pertenece a mis mandantes en virtud de haberlo adquirido según se evidencia en Documentos protocolizados por ante el Registro Público del Tercer Circuito del Municipio Autónomo Maracaibo del Estado Zulia, el día 14 de agosto de 2.013, inserto bajo el N° 2013.1601, Asiento Registral 1 del Inmueble Matriculado con el N° 481.21.5.3.2292 y correspondiente al libro de folio real del año 2.013, y ante el mismo registro, el día 26 de septiembre de 2.013, inserto bajo el N° 2013.1601, Asiento Registral 2 del Inmueble Matriculado con el N° 481.21.5.3.2292 y correspondiente al libro de folio real del año 2.013, asimismo, en su condición de herederas de la Sucesión BASABE VILLALOBOS LUIS ANTONIO, fallecido ab-intestato en esta Ciudad y Municipio Maracaibo del Estado Zulia en fecha 9 de Septiembre de 1997, conforme se evidencia a la Declaración Sucesoral N° 642-2022, expedida en fecha 26 de julio de 2022, emitida por el Servicio Nacional Integrado de Administración Aduanera y Tributaria (SENIAT), y le perteneció a su causante según consta en documentos protocolizados anteriormente mencionados. El precio de esta venta es la cantidad de SESENTA BOLÍVARES (Bs.60.000,00) que he recibido de los compradores, mediante cheque Nº S-91 20002950, de la entidad bancaria Banco de Venezuela, a la entera y total satisfacción de mis mandantes, con el otorgamiento de este documento y con fundamento en la titularidad antes invocada, en nombre de mis mandantes le transfiero a los compradores, todos los derechos de propiedad, dominio y posesión que les asisten sobre el referido bien, les hago la tradición legal y les respondo de saneamiento conforme a la ley. Y Nosotros, RONNY JESUS PACHECO MARQUEZ y NOREXCY CAROLINA HERNANDEZ GALLARDO, antes identificados, declaramos: Aceptamos la venta que se nos hace en los términos expuestos en este documento.- 
`,
                {
                    align: 'justify',
                }
            );

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
