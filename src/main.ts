import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './lib/swagger/swagger';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  app.set('trust proxy', 1);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  SwaggerModule.setup('api/docs', app, createDocument(app));

  await app.listen(port, () => {
    console.log('[WEB]', `your app is running on http://localhost:${port} 🚀`);
  });
}

bootstrap();
