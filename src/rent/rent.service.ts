import { BadRequestException, Injectable } from '@nestjs/common';
import { Rent, Type } from '@prisma/client';
import { DtoBaseResponse } from 'src/dtos/base-response';
import { baseResponse } from 'src/dtos/baseResponse';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RentService {

    constructor(private prismaService: PrismaService){}

    async getAllRents(): Promise<Rent[]>{
        return await this.prismaService.rent.findMany({
            include: {
                typerent: true
            }
        });
    }
    async getOneRents(id: string): Promise<Rent>{
        const oneRent =  await this.prismaService.rent.findUnique({
            where: {
                IdRent: Number(id)
            },
            include: {
                typerent: true
            }
        });

        if(!oneRent){
            throw new BadRequestException(`No se encontro el registro con el id ${id}`);
        }

        return oneRent;
    }

    async postNewRent(rent: Rent): Promise<DtoBaseResponse>{
        const createRent =  await this.prismaService.rent.create({
            data: rent
        });

        if(!createRent){
            throw new BadRequestException(`No se pudo registrar la propiedad.`);
        }

        baseResponse.message = 'Propiedad registrada exitosamente.';

        return baseResponse;
    }

    async getTypes(): Promise<Type[]>{
        return await this.prismaService.type.findMany();
    }
    async getLocations(): Promise<Rent[]>{
        return await this.prismaService.rent.findMany();
    }
}
