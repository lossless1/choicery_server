import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const fs = require('fs');
  const keyFile  = fs.readFileSync(__dirname + '/../ssl/choicery.app.key.pem');
  const certFile = fs.readFileSync(__dirname + '/../ssl/choicery.app.crt.pem');

  const appOptions = {
    cors: true,
    httpsOptions:{
      key: keyFile,
      cert: certFile,
    }
  };
  const app = await NestFactory.create(ApplicationModule, appOptions);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
      new ValidationPipe({
        transform: true
      }),
  );

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
