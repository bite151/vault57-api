import { Module } from '@nestjs/common';
import { configModule, typeOrmModuleOptions } from './configure.root';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { ImageModule } from './image/image.module';
import { MailModule } from './libs/mail/mail.module';
import { FeedbackModule } from './feedback/feedback.module';
import { TelegramModule } from './libs/telegram/telegram.module';

@Module({
  imports: [
    configModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmModuleOptions,
    }),
    PagesModule,
    AuthModule,
    UsersModule,
    UploadModule,
    ImageModule,
    MailModule,
    TelegramModule,
    FeedbackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
