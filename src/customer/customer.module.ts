import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { CustomerEntity } from './customer.entity';
import { UserModule } from '../user/user.module';
import { CompanyModule } from '../company/company.module';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerEntity]), UserModule, CompanyModule],
    providers: [CustomerService],
    controllers: [
        CustomerController
    ],
    exports: [
        CustomerService
    ]
})
export class CustomerModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                {path: 'customers', method: RequestMethod.GET},
                {path: 'customers', method: RequestMethod.POST},
                {path: 'customers/:id', method: RequestMethod.GET},
                {path: 'customers/:id', method: RequestMethod.DELETE},
                {path: 'customers/:id', method: RequestMethod.PUT});
    }
}
