import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { FeedbackEntity } from './entities/feedback.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from '../libs/mail/mail.service';
import { TelegramService } from '../libs/telegram/telegram.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackEntity])],
  controllers: [FeedbackController],
  providers: [FeedbackService, MailService, TelegramService],
})
export class FeedbackModule {}
