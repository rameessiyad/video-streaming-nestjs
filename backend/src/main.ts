import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = process.env.PORT ?? 5000;
  await app
    .listen(PORT)
    .then(() => console.log(`Server running on port ${PORT}`));
}
bootstrap();
