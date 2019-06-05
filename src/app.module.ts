import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule } from './config/config.module';
import { RequestModule } from './request/request.module';
import { CustomerModule } from './customer/customer.module';
import { CompanyModule } from './company/company.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ConfigModule,
        UserModule,
        CompanyModule,
        CustomerModule,
        RequestModule,
    ],
    controllers: [
        AppController
    ],
    providers: []
})
export class ApplicationModule {
    constructor(private readonly connection: Connection) {
    }
}
