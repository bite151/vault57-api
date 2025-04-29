import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import { ParseMode } from 'telegraf/types';

@Injectable()
export class TelegramService {
  private readonly bot: Telegraf;
  private readonly logger = new Logger(TelegramService.name);

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new Telegraf(token);
  }

  public async sendMessage(
    text: string,
    parseMode: ParseMode = 'MarkdownV2',
  ): Promise<any> {
    if (!this.bot) {
      this.logger.error('Telegram bot not initialized');
      return false;
    }

    if (parseMode === 'HTML') {
      text = this.parseHtmlToTelegramText(text);
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

  private parseHtmlToTelegramText(html: string): string {
    return html
      .replace(/<br\s?\/?>/gi, '\n')
      .replace(/<\/p>|<\/div>|<\/h\d>/gi, '\n\n')
      .replace(/<b>|<\/b>|<strong>|<\/strong>/gi, '*')
      .replace(/<i>|<\/i>|<em>|<\/em>/gi, '_')
      .replace(/<code>|<\/code>/gi, '`')
      .replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/gi, '[$2]($1)')
      .replace(/<[^>]+>/g, '')
      .replace(/\n\s+\n/g, '\n\n')
      .trim();
  }

  private escapeMarkdownV2(text: string): string {
    const escapeChars = [
      '_',
      '*',
      '[',
      ']',
      '(',
      ')',
      '~',
      '`',
      '>',
      '#',
      '+',
      '-',
      '=',
      '|',
      '{',
      '}',
      '.',
      '!',
    ];
    return text.replace(
      new RegExp(`([${escapeChars.join('\\')}])`, 'g'),
      '\\$1',
    );
  }
}
