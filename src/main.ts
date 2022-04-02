import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  app.set('trust proxy', 1);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(port, () => {
    console.log('[WEB]', `your app is running on http://localhost:${port} 🚀`);
  });
}

bootstrap();
