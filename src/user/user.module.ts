import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthMiddleware } from './auth.middleware';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        ConfigModule
    ],
    providers: [
        UserService
    ],
    controllers: [
        UserController
    ],
    exports: [
        UserService
    ]
})
export class UserModule  {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                {path: 'users', method: RequestMethod.GET},
                {path: 'users', method: RequestMethod.PUT},
                {path: 'users', method: RequestMethod.DELETE},
            );
    }
}
