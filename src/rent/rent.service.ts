import { BadRequestException, Injectable } from '@nestjs/common';
import { Rent, Type } from '@prisma/client';
import { DtoBaseResponse } from 'src/dtos/base-response';
import { baseResponse } from 'src/dtos/baseResponse';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoRents, DtoUpdateRent } from './rent.dtos';

const PDFDocument = require('pdfkit')

@Injectable()
export class RentService {

    constructor(private prismaService: PrismaService) { }

    async getAllRents(): Promise<Rent[]> {
        return await this.prismaService.rent.findMany({
            where: {
                idState: 1
            },
            include: {
                typerent: true,
                client: true,
                autorization: true,
                state: true
            }
        });
    }
    async getOneRents(id: string): Promise<Rent> {
        const oneRent = await this.prismaService.rent.findFirst({
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
                info: rent.info,
                price: rent.price,
                squareMeters: rent.squareMeters,
                images: rent.images,
                idClient: rent.idClient,
                avenue: rent.avenue,
                urbanization: rent.urbanization,
                days: rent.days,
                date: new Date(),
                autorizationId: rent.idUser,
                idState: 1,
            }
        });

        if (!createRent) {
            throw new BadRequestException(`No se pudo registrar la propiedad.`);
        }

        return this.getPdfDownload(createRent.idRent.toString())
    }

    async putUpdateRent(rent: DtoUpdateRent): Promise<DtoBaseResponse> {
        const createRent = await this.prismaService.rent.update({
            data: {
                idState: 2
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

    formatNumber(number: number): string {
        number *= 37;
        return `${number.toLocaleString('de-DE')},00`;
    }

    //Compra venta
    async getPdfDownload(id: string): Promise<Buffer> {
        const oneRent = await this.prismaService.rent.findFirst({
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
        const year = date.getFullYear().toString();
        const month: number = date.getMonth();
        const monthNames: string[] = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

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
                Entre los suscritos a saber: ${oneRent.autorization.name} ${oneRent.autorization.lastname}, mayor de edad, identificado con cédula de ciudadanía No. ${oneRent.autorization.identify}, quien en adelante se denominará EL COMPRADOR; y por la otra parte ${oneRent.client.name} ${oneRent.client.lastname}, mayor de edad, identificado con cédula de ciudadanía No. ${oneRent.client.identify}, quien en adelante se denominará EL VENDEDOR, hemos convenido celebrar el presente CONTRATO DE COMPRAVENTA, el cual se regirá por las siguientes cláusulas:

                PRIMERA
                    OBJETO: Por medio del presente contrato, EL VENDEDOR vende y transfiere a EL COMPRADOR el pleno dominio, posesión y propiedad del inmueble ubicado en ${oneRent.addressDetails}.

                SEGUNDA
                    PRECIO Y FORMA DE PAGO: EL COMPRADOR se obliga a pagar a EL VENDEDOR la suma de ${this.formatNumber(Number(oneRent.price))} por la compra del inmueble. El pago se realizará de la siguiente manera:
                    1. Un valor de ${this.formatNumber(Number(oneRent.price))} como pago inicial, el cual se entrega en este acto.
                    2. El saldo restante de ${this.formatNumber(Number(oneRent.price))} será pagado en [NÚMERO] cuotas mensuales y consecutivas de [VALOR DE LAS CUOTAS EN NÚMEROS Y LETRAS], las cuales serán canceladas por EL COMPRADOR a EL VENDEDOR, a más tardar el día [NÚMERO] de cada mes.

                TERCERA
                    ENTREGA DEL INMUEBLE: EL VENDEDOR se compromete a hacer entrega material y jurídica del inmueble a EL COMPRADOR en un plazo máximo de [NÚMERO] días hábiles, contados a partir de la fecha de firma del presente contrato.

                CUARTA
                    SANEAMIENTO: EL VENDEDOR declara que el inmueble objeto de este contrato se encuentra libre de todo gravamen, limitación, afectación o condición que pueda afectar su dominio y que, en consecuencia, puede disponer libremente de él.

                QUINTA
                    GASTOS: Los gastos notariales, de registro y demás que se originen con la firma y protocolización del presente contrato, serán asumidos en su totalidad por EL COMPRADOR.

                En constancia de lo anterior, se firma el presente contrato en la ciudad de [CIUDAD], a los ${day} días del mes de ${monthNames[month]} de ${year}.

                EL COMPRADOR                                 EL VENDEDOR
                ${oneRent.autorization.name} ${oneRent.autorization.lastname}                           ${oneRent.client.name} ${oneRent.client.lastname}
                C.C. [NÚMERO]                                 C.C. [NÚMERO]
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
        const oneRent = await this.prismaService.sales.findFirst({
            where: {
                rent: {
                    idRent: Number(id)
                }
            },
            include: {
                rent: {
                    include: {
                        typerent: true,
                        client: true,
                        autorization: true,
                        state: true
                    }
                },
                client: true
            }
        });

        if (!oneRent) {
            throw new BadRequestException(`No se encontro el registro con el id ${id}`);
        }

        const date = new Date(oneRent.date);
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const month: number = date.getMonth();
        const monthNames: string[] = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

        const pdfRent: Buffer = await new Promise(resolve => {
            const doc = new PDFDocument();

            doc.image('src/assests/logo.jpg', {
                width: 120,
                height: 120,
                align: 'center',
                valign: 'center'
            });
            doc.moveDown(10);

            doc.font('Helvetica-Oblique').text(`CONTRATO DE COMPRAVENTA DE INMUEBLE

En la ciudad de ____________________, a los ${day} días del mes de ${monthNames[month]} del año ${year}, se reúnen:

Por una parte, el/la señor/a ${oneRent.rent.client.name} ${oneRent.rent.client.lastname}, mayor de edad, de nacionalidad _____________, titular de la cédula de identidad Nº ${oneRent.rent.client.identify}, actuando en su propio nombre y representación, en calidad de VENDEDOR/A.

Por otra parte, el/la señor/a ${oneRent.client.name} ${oneRent.client.lastname}, mayor de edad, de nacionalidad _____________, titular de la cédula de identidad Nº ${oneRent.client.identify}, actuando en su propio nombre y representación, en calidad de COMPRADOR/A.

Y por otra parte, el/la señor/a ${oneRent.rent.autorization.name} ${oneRent.rent.autorization.lastname}, mayor de edad, de nacionalidad _____________, titular de la cédula de identidad Nº ${oneRent.rent.autorization.identify}, actuando en representación de la empresa Inversiones Siglo XXI INSICA, en calidad de PROMOTOR/A DE VENTAS.

Todos los comparecientes, a quienes en lo sucesivo se les denominará conjuntamente como "LAS PARTES", han convenido en celebrar el presente Contrato de Compraventa de Inmueble, el cual se regirá por las siguientes cláusulas:

CLÁUSULAS:

PRIMERA: OBJETO DEL CONTRATO
El/La VENDEDOR/A transfiere, vende y enajena de manera libre y voluntaria al/a la COMPRADOR/A, quien adquiere y compra, el siguiente inmueble:
[Descripción detallada del inmueble: ubicación, área, tipo de propiedad, etc.]

SEGUNDA: PRECIO Y FORMA DE PAGO
El precio de la compraventa del inmueble asciende a la cantidad de _____________________________________________________________________ Bolívares Soberanos (Bs.S. ${this.formatNumber(Number(oneRent.rent.price))}), los cuales serán pagados de la siguiente manera: ________________________________________________________
____________________________________________________________________________________________________________________________________________

TERCERA: DECLARACIONES Y GARANTÍAS
[Incluir declaraciones y garantías de las partes, incluyendo la titularidad del vendedor, ausencia de gravámenes, entre otros]

CUARTA: OBLIGACIONES DE LAS PARTES
[Detallar las principales obligaciones de cada una de las partes]

QUINTA: CLAUSULAS LEGALES
[Incluir cláusulas legales estándar para compraventa de inmuebles en Venezuela, tales como: inscripción en el Registro de la Propiedad, gastos e impuestos, saneamiento de evicción y vicios ocultos, resolución de conflictos, entre otros]

SEXTA: FIRMAS Y TESTIGOS
En señal de conformidad, las partes firman el presente contrato en tres (3) ejemplares de un mismo tenor y a un solo efecto, en presencia de los testigos que también suscriben al pie.

Los contratantes, leído el presente documento, dan su asentimiento expresamente a lo estipulado y firman como aparece, ante testigos que los suscriben, en la ciudad de ______________a los ${day} días del mes de ${monthNames[month]} de ${year} en dos ejemplares, uno para cada prometiente.


___________________________               _____________________________
Nombre:         	                       Nombre:
cc.:            			               cc:
PROMETIENTE VENDEDOR                       PROMETIENTE COMPRADOR

___________________________               _____________________________
Nombre:                                   Nombre:
cc.:                                      cc:
Testigo                                   Testigo

`,
                {
                    align: 'justify',
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


// CONTRATO DE COMPRAVENTA

// Entre los suscritos a saber: [NOMBRE COMPLETO DEL COMPRADOR], mayor de edad, identificado con cédula de ciudadanía No. [NÚMERO], quien en adelante se denominará EL COMPRADOR; y por la otra parte [NOMBRE COMPLETO DEL VENDEDOR], mayor de edad, identificado con cédula de ciudadanía No. [NÚMERO], quien en adelante se denominará EL VENDEDOR, hemos convenido celebrar el presente CONTRATO DE COMPRAVENTA, el cual se regirá por las siguientes cláusulas:

// PRIMERA. OBJETO: Por medio del presente contrato, EL VENDEDOR vende y transfiere a EL COMPRADOR el pleno dominio, posesión y propiedad del inmueble ubicado en [DIRECCIÓN COMPLETA DEL INMUEBLE], identificado con el folio de matrícula inmobiliaria No. [NÚMERO].

// SEGUNDA. PRECIO Y FORMA DE PAGO: EL COMPRADOR se obliga a pagar a EL VENDEDOR la suma de [VALOR EN NÚMEROS Y LETRAS] por la compra del inmueble. El pago se realizará de la siguiente manera:
// 1. Un valor de [VALOR EN NÚMEROS Y LETRAS] como pago inicial, el cual se entrega en este acto.
// 2. El saldo restante de [VALOR EN NÚMEROS Y LETRAS] será pagado en [NÚMERO] cuotas mensuales y consecutivas de [VALOR DE LAS CUOTAS EN NÚMEROS Y LETRAS], las cuales serán canceladas por EL COMPRADOR a EL VENDEDOR, a más tardar el día [NÚMERO] de cada mes.

// TERCERA. ENTREGA DEL INMUEBLE: EL VENDEDOR se compromete a hacer entrega material y jurídica del inmueble a EL COMPRADOR en un plazo máximo de [NÚMERO] días hábiles, contados a partir de la fecha de firma del presente contrato.

// CUARTA. SANEAMIENTO: EL VENDEDOR declara que el inmueble objeto de este contrato se encuentra libre de todo gravamen, limitación, afectación o condición que pueda afectar su dominio y que, en consecuencia, puede disponer libremente de él.

// QUINTA. GASTOS: Los gastos notariales, de registro y demás que se originen con la firma y protocolización del presente contrato, serán asumidos en su totalidad por EL COMPRADOR.

// En constancia de lo anterior, se firma el presente contrato en la ciudad de [CIUDAD], a los [DÍA] días del mes de [MES] de [AÑO].

// EL COMPRADOR                                 EL VENDEDOR
// [NOMBRE COMPLETO]                           [NOMBRE COMPLETO]
// C.C. [NÚMERO]                                 C.C. [NÚMERO]
