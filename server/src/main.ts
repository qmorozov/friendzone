import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
      .setTitle("FriendZone API")
      .setVersion("1.0")
      .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/api/v1/docs", app, document);

  await app.listen(PORT);
}

bootstrap();
