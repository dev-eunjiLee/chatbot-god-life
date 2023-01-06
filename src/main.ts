import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 컨트롤러가 값을 받을 때 컨트롤러에서 정의한 타입으로 형 변환
      forbidNonWhitelisted: true, // dto에 정의되지 않은 프로퍼티 넘어오는 경우 에러 발생
    }),
  );

  await app.listen(3000);
}
bootstrap();
