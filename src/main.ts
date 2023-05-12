import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './shared/decorators/middlewares/tokenValidation.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new AuthMiddleware().use);

  await app.listen(3000);
}
bootstrap();
