import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';

export const getMailerConfig = (
  configService: ConfigService,
): MailerOptions => ({
  transport: {
    host: configService.getOrThrow<string>('SMTP_HOST'),
    port: +configService.getOrThrow<string>('SMTP_PORT'),
    secure: true,
    auth: {
      user: configService.getOrThrow<string>('SMTP_USER'),
      pass: configService.getOrThrow<string>('SMTP_PASSWORD'),
    },
  },
  defaults: {
    from: configService.getOrThrow<string>('SMTP_USER'),
  },
});
