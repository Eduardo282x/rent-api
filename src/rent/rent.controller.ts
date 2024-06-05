import { Controller, Get, Param } from '@nestjs/common';
import { RentService } from './rent.service';
import { Rent } from '@prisma/client';

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
}
