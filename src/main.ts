import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './shared/decorators/middlewares/tokenValidation.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/users/', new AuthMiddleware().use);
  app.use('/users/list', new AuthMiddleware().use);
  app.use('/users/update/:id', new AuthMiddleware().use);
  app.use('/users/remove/:id', new AuthMiddleware().use);
  app.use('/users/image/:id', new AuthMiddleware().use);

  await app.listen(3000);
}
bootstrap();
