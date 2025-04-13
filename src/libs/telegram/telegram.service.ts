import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  private readonly bot: Telegraf;
  private readonly logger = new Logger(TelegramService.name);

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new Telegraf(token);
  }

  public async sendMessage(text: string): Promise<any> {
    if (!this.bot) {
      this.logger.error('Telegram bot not initialized');
      return false;
    }

    const chatId = this.configService.getOrThrow<string>('TELEGRAM_CHAT_ID');
    try {
      await this.bot.telegram.sendMessage(chatId, text, {
        parse_mode: 'MarkdownV2',
      });
      return true;
    } catch (error: any) {
      this.logger.error(`Failed to send Telegram message: ${error?.message}`);
      return false;
    }
  }
}
