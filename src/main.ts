import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
