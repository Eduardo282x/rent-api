import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RentService } from 'src/rent/rent.service';

@Module({
  controllers: [SalesController],
  providers: [SalesService, PrismaService, RentService]
})
export class SalesModule {}
