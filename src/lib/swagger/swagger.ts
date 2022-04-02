import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';

export function createDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .setVersion(SWAGGER_CONFIG.version);

  const options = builder.build();

  return SwaggerModule.createDocument(app, options);
}
