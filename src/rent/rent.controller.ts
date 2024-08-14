import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { RentService } from './rent.service';
import { Rent } from '@prisma/client';
import { DtoBaseResponse } from 'src/dtos/base-response';
import { DtoRents, DtoUpdateRent, DtoUpdateRentData } from './rent.dtos';

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

    @Put('/data')
    async updateRentData(@Body() updateRent: DtoUpdateRentData): Promise<DtoBaseResponse> {
        return this.rentService.putUpdateRentData(updateRent);
    }
}
