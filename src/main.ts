import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      skipMissingProperties: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
    }),
  );
  app.enableCors();
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`dev started on localhost:${PORT}`);
}
bootstrap();
