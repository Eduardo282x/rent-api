import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
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

    @Get('/pdfDownload/:id')
    async getPdfRent(@Param('id') id: string, @Res() res): Promise<void> {
        const buffer = await this.rentService.getPdfDownload(id);

        res.set({
            "Content-Type":"application/pdf",
            "Content-Disposition":"attachment; filename=compra-venta.pdf",
            "Content-Length":buffer.length
        });

        res.end(buffer);
    }

    @Post()
    async createRent(@Body() newRent: DtoRents, @Res() res): Promise<void> {
        const buffer = await this.rentService.postNewRent(newRent);

        res.set({
            "Content-Type":"application/pdf",
            "Content-Disposition":"attachment; filename=compra-venta.pdf",
            "Content-Length":buffer.length
        });

        res.end(buffer);
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
