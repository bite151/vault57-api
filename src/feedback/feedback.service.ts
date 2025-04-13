import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackEntity } from './entities/feedback.entity';
import { Repository } from 'typeorm';
import { MailService } from '../libs/mail/mail.service';
import { TelegramService } from '../libs/telegram/telegram.service';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private readonly feedbackRepository: Repository<FeedbackEntity>,
    private readonly mailService: MailService,
    private readonly telegramService: TelegramService,
  ) {}
  async create(createFeedbackDto: CreateFeedbackDto) {
    try {
      const feedback = await this.feedbackRepository.save(createFeedbackDto);
      await this.mailService.sendFeedbackEmail(
        createFeedbackDto.clientName,
        createFeedbackDto.contact,
        createFeedbackDto.message,
      );
      await this.feedbackRepository.save({
        id: feedback.id,
        status: 1,
      });

      const text: string = `
*Client*: ${createFeedbackDto.clientName}
*Contact*: ${createFeedbackDto.contact}

${createFeedbackDto.message}
      `;

      await this.telegramService.sendMessage(text);
      return {
        message: 'Successfully sent',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return `This action returns all feedback`;
  }
}
