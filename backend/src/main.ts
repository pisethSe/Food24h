import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('');
  app.enableCors({
    origin: (process.env.CORS_ORIGINS?.split(',') ?? [
      'http://localhost:3001',
      'http://localhost:3002',
    ]),
  });
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
