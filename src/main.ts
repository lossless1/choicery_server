import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { EnvironmentEnum } from './enums/environment.enum';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const fs = require('fs');
    const keyFile = fs.readFileSync(__dirname + '/../ssl/api.choicery.app_le1.key');
    const certFile = fs.readFileSync(__dirname + '/../ssl/api.choicery.app_le1.crt');
    const caFile = fs.readFileSync(__dirname + '/../ssl/api.choicery.app_le1.ca');

    let appOptions: NestApplicationOptions = {
        cors: true,
    };

    if (ConfigService.getInstance().get('NODE_ENV') === EnvironmentEnum.PRODUCTION) {
        appOptions = {
            ...appOptions,
            httpsOptions: {
                ca: caFile,
                key: keyFile,
                cert: certFile,
            }
        }
    }
    const app = await NestFactory.create<NestExpressApplication>(ApplicationModule, appOptions);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        }),
    );

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    //
    const options = new DocumentBuilder()
        .setTitle('Choicery App')
        .setDescription('Choicery description')
        .setVersion('1.0')
        .setBasePath('api')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);
    await app.listen(4000);
}

bootstrap();
