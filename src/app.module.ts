import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MainLoadModule } from './main-load/main-load.module';
import { RentModule } from './rent/rent.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [AuthModule, UsersModule, MainLoadModule, RentModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
