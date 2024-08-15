import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sales } from '@prisma/client';
import { BodySale } from './sales.dto';
import { RentService } from 'src/rent/rent.service';

@Controller('sales')
export class SalesController {
    constructor(private salesServices: SalesService, private rentService: RentService) { }

    @Get()
    async getSales(): Promise<Sales[]> {
        return this.salesServices.getSales();
    }

    @Get('/pdfDownload/:id')
    async getOneSale(@Param('id') id: string, @Res() res): Promise<void> {
        const buffer = await this.rentService.getPdfDownloadFinish(id);

        res.set({
            "Content-Type":"application/pdf",
            "Content-Disposition":"attachment; filename=compra-venta.pdf",
            "Content-Length":buffer.length
        });

        res.end(buffer);
    }

    @Post()
    async createSales(@Body() bodySale: BodySale, @Res() res): Promise<void> {
        const buffer = await this.salesServices.registerSales(bodySale);

        res.set({
            "Content-Type":"application/pdf",
            "Content-Disposition":"attachment; filename=compra-venta.pdf",
            "Content-Length":buffer.length
        });

        res.end(buffer);
    }
}
