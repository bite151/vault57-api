import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageEntity } from './entities/page.entity';
import { PageSeoEntity } from './entities/page_seo.entity';
import { PageDesktopEntity } from './entities/page_desktop.entity';
import { PageMobileEntity } from './entities/page_mobile.entity';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { UploadService } from '../libs/upload/upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PageEntity,
      PageSeoEntity,
      PageDesktopEntity,
      PageMobileEntity,
      UserEntity,
    ]),
  ],
  controllers: [PagesController],
  providers: [PagesService, UsersService, UploadService],
})
export class PagesModule {}
