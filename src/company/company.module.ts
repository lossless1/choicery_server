import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from './company.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { CompanyEntity } from './company.entity';
import { UserModule } from '../user/user.module';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity]),
      UserModule,
      ConfigModule
  ],
  providers: [
      CompanyService,
  ],
  controllers: [
    CompanyController
  ],
  exports: [
    CompanyService
  ]
})
export class CompanyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'companies', method: RequestMethod.GET},
        // {path: 'companies', method: RequestMethod.POST},
        {path: 'companies/:id', method: RequestMethod.GET},
        {path: 'companies/:id', method: RequestMethod.DELETE},
        {path: 'companies/:id', method: RequestMethod.PUT});
  }
}
