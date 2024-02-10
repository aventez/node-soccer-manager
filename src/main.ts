import {
  ClassSerializerInterceptor,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { winstonConfig } from './config/constants/winstonConfig';
import { EntityNotFoundExceptionFilter } from "./filters/entity-not-found-exception.filter";
import { UniqueEntityDuplicatedExceptionFilter } from "./filters/unique-entity-duplicated.filter";

function setupSwagger(app: INestApplication): void {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Soccer Manager')
    .setDescription('REST API for soccer manager')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const logger: Logger = new Logger('app');
  const app: INestApplication = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new EntityNotFoundExceptionFilter(),
    new UniqueEntityDuplicatedExceptionFilter(httpAdapter)
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get('port');
  const env = configService.get('nodeEnv');

  if (env === 'dev') {
    setupSwagger(app);
  }

  await app.listen(port, () => {
    logger.log(`* Listening on ::${port}`);
  });
}

bootstrap();
