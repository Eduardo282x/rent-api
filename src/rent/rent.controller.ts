import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RentService } from './rent.service';
import { Rent } from '@prisma/client';
import { DtoBaseResponse } from 'src/dtos/base-response';

@Controller('rent')
export class RentController {

    constructor(private rentService: RentService) { }

    @Get()
    async getRents(): Promise<Rent[]> {
        return this.rentService.getAllRents();
    }
    @Get('/:id')
    async getOneRent(@Param('id') id: string): Promise<Rent> {
        return this.rentService.getOneRents(id);
    }

    @Post()
    async createRent(@Body() newRent): Promise<DtoBaseResponse> {
        return this.rentService.postNewRent(newRent);
    }
}
