import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RentService } from './rent.service';
import { Rent } from '@prisma/client';
import { DtoBaseResponse } from 'src/dtos/base-response';
import { DtoRentAutorization, DtoRents, DtoUpdateRent } from './rent.dtos';

@Controller('rent')
export class RentController {

    constructor(private rentService: RentService) { }

    @Get()
    async getRents(): Promise<Rent[]> {
        return this.rentService.getAllRentsAvalibles();
    }
    @Get('all')
    async getRentsAll(): Promise<Rent[]> {
        return this.rentService.getAllRents();
    }
    @Get('/:id')
    async getOneRent(@Param('id') id: string): Promise<Rent> {
        return this.rentService.getOneRents(id);
    }

    @Post()
    async createRent(@Body() newRent: DtoRents): Promise<DtoBaseResponse> {
        return this.rentService.postNewRent(newRent);
    }

    @Put()
    async updateRent(@Body() updateRent: DtoUpdateRent): Promise<DtoBaseResponse> {
        return this.rentService.putUpdateRent(updateRent);
    }
    @Put('autorization')
    async updateAutorizationRent(@Body() updateAutorization: DtoRentAutorization): Promise<DtoBaseResponse> {
        return this.rentService.autorizationRent(updateAutorization);
    }
}
