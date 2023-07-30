import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {BadRequestException, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(new ValidationPipe({exceptionFactory: (errors) => new BadRequestException(errors)}));

  const config = new DocumentBuilder()
      .setTitle("FriendZone API")
      .setVersion("1.0")
      .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/api/v1/docs", app, document);

  await app.listen(PORT);
}

bootstrap();
