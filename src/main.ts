import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Resume Service')
    .setDescription('Resume service')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:5173'], // Замените на список доменов, которым разрешен доступ
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Если вы работаете с куки или аутентификацией
  });
  await app.listen(port);
}
bootstrap();
