import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';

import { AppModule } from './app.module';

require('dotenv').config();

const port = process.env.PORT || 8080;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap {}');
}
bootstrap();
