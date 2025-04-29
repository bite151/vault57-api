import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { PagesService } from '../pages/pages.service';
import { PageEntity } from '../pages/entities/page.entity';
import { PageSeoEntity } from '../pages/entities/page_seo.entity';
import { PageDesktopEntity } from '../pages/entities/page_desktop.entity';
import { PageMobileEntity } from '../pages/entities/page_mobile.entity';
import { UploadService } from '../libs/upload/upload.service';
import { TelegramService } from '../libs/telegram/telegram.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      UserEntity,
      PageEntity,
      PageSeoEntity,
      PageDesktopEntity,
      PageMobileEntity,
    ]),
  ],
  controllers: [ReviewsController],
  providers: [
    ReviewsService,
    UsersService,
    PagesService,
    UploadService,
    TelegramService,
  ],
})
export class ReviewsModule {}
