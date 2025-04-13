import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import { FeedbackTemplate } from './templates/feedback.template';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendFeedbackEmail(
    name: string,
    contact: string,
    message: string,
  ): Promise<SentMessageInfo> {
    const html = await render(FeedbackTemplate({ name, contact, message }));
    const sendTo = this.configService.getOrThrow<string>('SMTP_SEND_TO');

    return this.sendMail(sendTo, 'Feedback', html);
  }

  private sendMail(
    email: string,
    subject: string,
    html: string,
  ): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
