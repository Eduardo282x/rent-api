import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RentService } from './rent.service';
import { Rent } from '@prisma/client';
import { DtoBaseResponse } from 'src/dtos/base-response';
import { DtoRentImage, DtoRents, DtoUpdateRent, DtoUpdateRentData } from './rent.dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

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
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=compra-venta.pdf",
            "Content-Length": buffer.length
        });

        res.end(buffer);
    }

    @Post()
    async createRent(@Body() newRent: DtoRents, @Res() res): Promise<void> {
        const buffer = await this.rentService.postNewRent(newRent);
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=compra-venta.pdf",
            "Content-Length": buffer.length
        });
        res.end(buffer);
    }

    @Put('/image')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: join(__dirname, '../../../rent-system/public'),
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            },
        }),
    }))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Query() updateRent
    ) {

        // Verifica si el archivo se ha cargado correctamente.
        // if (!file) {
        //     throw new BadRequestException('Archivo no encontrado');
        // }

        // Continúa con la lógica de negocio (por ejemplo, guardar en la base de datos).
        return await this.rentService.putUpdateRentImage(file, updateRent);
    }

    @Put('/data')
    async updateRentData(@Body() updateRent: DtoUpdateRentData): Promise<DtoBaseResponse> {
        return this.rentService.putUpdateRentData(updateRent);
    }
}
