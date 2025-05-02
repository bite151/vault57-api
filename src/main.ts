import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { RedisStore } from 'connect-redis';
import IORedis from 'ioredis';
import * as session from 'express-session';
import { parseBoolean } from './libs/utils/parse-boolean.util';
import { json, urlencoded } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const cookiesSecret = configService.get<string>('COOKIES_SECRET');
  if (!cookiesSecret) {
    throw new Error('COOKIES_SECRET is not defined in .env');
  }

  app.use(cookieParser(cookiesSecret));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validateCustomDecorators: true,
      stopAtFirstError: false,
    }),
  );

  const redisClient = new IORedis({
    host: configService.get<string>('REDIS_HOST'),
    port: +configService.getOrThrow<string>('REDIS_PORT'),
    password: configService.get<string>('REDIS_PASSWORD'),
  });

  redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
  });

  redisClient.on('connect', () => {
    console.log('Connected to Redis');
  });

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: configService.getOrThrow<string>('SESSION_FOLDER'),
  });

  app.use(
    session({
      store: redisStore,
      secret: configService.getOrThrow<string>('SESSION_SECRET'),
      name: configService.getOrThrow<string>('SESSION_NAME'),
      resave: true,
      saveUninitialized: false,
      proxy: true,
      cookie: {
        domain: configService.getOrThrow<string>('SESSION_DOMAIN'),
        maxAge: +configService.getOrThrow<string>('SESSION_MAX_AGE'),
        httpOnly: parseBoolean(
          configService.getOrThrow<string>('SESSION_HTTP_ONLY'),
        ),
        secure: parseBoolean(
          configService.getOrThrow<string>('SESSION_SECURE'),
        ),
        sameSite: configService.getOrThrow<'lax' | 'strict' | 'none'>('SAME_SITE'),
      },
    }),
  );

  app.enableCors({
    origin: [configService.getOrThrow<string>('ALLOWED_ORIGIN')],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  const port: number = configService.getOrThrow<number>('PORT') ?? 3000;

  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

bootstrap();
