import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { GraphQLErrorFilter } from './common/filter/graphql.exception.filter';
import { config } from 'dotenv';

config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    console.log(process.env.ALLOW_ORIGIN);
    app.enableCors({
        origin: process.env.ALLOW_ORIGIN, // Allowed origins
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
        credentials: true, // Allow credentials (e.g., cookies)
        allowedHeaders: 'Content-Type, Accept, Authorization', // Allowed headers
    });
    app.useGlobalFilters(new HttpExceptionFilter(), new GraphQLErrorFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    );
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
