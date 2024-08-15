import { Injectable } from '@nestjs/common';
import { Rent, Sales } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RentService } from 'src/rent/rent.service';
import { BodySale } from './sales.dto';

@Injectable()
export class SalesService {

    constructor(private prismaService: PrismaService, private rentService: RentService) { }

    async getSales(): Promise<Sales[]> {
        return await this.prismaService.sales.findMany({
            where: {
                rent: {
                    idState: 2
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
    }

    async registerSales(addSale: BodySale): Promise<Buffer> {
        const creaete = await this.prismaService.sales.create({
            data: {
                date: new Date(),
                idClient: addSale.idClient,
                idRent: addSale.idRent,
            }
        });

        const findRent = await this.prismaService.rent.update({
            data:
            {
                idState: 2
            },
            where: {
                idRent: addSale.idRent
            }
        });

        if(findRent){
            console.log('Propiedad Actualizada');
        }
        

        return this.rentService.getPdfDownloadFinish(creaete.idRent.toString())
    }
}
