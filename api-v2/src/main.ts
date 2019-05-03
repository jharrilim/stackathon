import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = +(process.env.API_PORT || 3000);
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap()
  .catch(console.error);
