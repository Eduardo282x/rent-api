import { Module } from '@nestjs/common';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RentController],
  providers: [RentService, PrismaService]
})
export class RentModule {}
