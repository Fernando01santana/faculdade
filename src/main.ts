import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import AllExceptionFilters from 'shared/interceptors/allInterceptorsHttp';
import { AppModule } from './app.module';
config();
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilters());
  await app.listen(3001);
}
bootstrap();
