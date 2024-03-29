import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestService } from './request.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { RequestEntity } from './request.entity';
import { UserModule } from '../user/user.module';
import { CustomerModule } from '../customer/customer.module';
import { UserEntity } from '../user/user.entity';
import { CompanyModule } from '../company/company.module';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestEntity, UserEntity]),
        ConfigModule,
        UserModule,
        CustomerModule,
        CompanyModule
    ],
    providers: [RequestService],
    controllers: [
        RequestController
    ]
})
export class RequestModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                {path: 'requests', method: RequestMethod.GET},
                {path: 'requests/:id', method: RequestMethod.GET},
                {path: 'requests/:id', method: RequestMethod.DELETE},
                {path: 'requests/:id', method: RequestMethod.PUT});
    }
}
