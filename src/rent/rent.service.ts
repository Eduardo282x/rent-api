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
            include: {
                typerent: true,
                client: true,
                autorization: true
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

        return this.getPdfDownload(createRent.idRent.toString());

        // baseResponse.message = 'Propiedad registrada exitosamente.';

        // return baseResponse;
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
        const year = date.getFullYear().toString();
        const month: number = date.getMonth();
        const monthNames: string[] = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

        const pdfRent: Buffer = await new Promise(resolve => {
            const doc = new PDFDocument();

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
