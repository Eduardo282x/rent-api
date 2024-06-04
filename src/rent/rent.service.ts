import { Injectable } from '@nestjs/common';
import { Rent } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RentService {

    constructor(private prismaService: PrismaService){}

    async getAllRents(): Promise<Rent[]>{
        return await this.prismaService.rent.findMany();
    }
}
