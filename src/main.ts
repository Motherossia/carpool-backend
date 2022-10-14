import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { TransformInterceptor } from './transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';

async function bootstrap() {
    const logger = new Logger();
    const app = await NestFactory.create(AppModule);

    // USE GLOBAL PIPE
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new TransformInterceptor());

    // SWAGGER
    const options = new DocumentBuilder().setTitle('API').setDescription('API description').setVersion('1.0').addTag('API').build();
    const document = SwaggerModule.createDocument(app, options, {
        include: [ProductModule, UserModule],
    });
    SwaggerModule.setup('api', app, document);

    const config = new ConfigService();
    const PORT = process.env.PORT || (await config.getPortConfig());

    await app.listen(PORT);
    logger.log(`Application listening on port${PORT}`);
}
bootstrap();
