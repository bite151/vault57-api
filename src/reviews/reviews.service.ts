import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { PagesService } from '../pages/pages.service';
import { CreatePageDto } from '../pages/dto/create-page.dto';
import { TelegramService } from '../libs/telegram/telegram.service';

type Role = 'admin' | 'user' | 'guest';

export enum UserRole {
  PUBLIC = 'public',
  USER = 'user',
  ADMIN = 'admin',
}

export enum ItemType {
  FILE = 'file',
  FOLDER = 'folder',
  REVIEW = 'review',
}

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly pagesService: PagesService,
    private readonly telegramService: TelegramService,
  ) {}
  async create(createReviewDto: CreateReviewDto) {
    const pages = await this.pagesService.findAll('admin');
    const reviews = pages.filter((page) => page.type === ItemType.REVIEW);

    const page: CreatePageDto = {
      parentId: 79,
      url: `/review-${reviews.length + 1}`,
      content: JSON.stringify(createReviewDto),
      range: 1,
      isPublic: 0,
      type: ItemType.REVIEW,
      permission: UserRole.PUBLIC,
      seo: {
        title: 'Отзыв',
        description: '',
      },
      mobile: {
        icon: 'MessageCircleDashed',
        title: `Новый отзыв ${reviews.length + 1}.txt`,
        shortTitle: '',
        description: '',
        contentComponent: 'ReviewsViewer',
        showInLauncher: 0,
        loadParentScreens: 1,
        background: '#dededc',
      },
      desktop: {
        icon: 'MessageCircleDashed',
        title: `Новый отзыв ${reviews.length + 1}.txt`,
        contentComponent: 'ReviewsViewer',
        showInFinder: 0,
        resetWidth: 0,
        hideStatusBar: 0,
        background: '',
      },
      createdBy: 'User',
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
    };

    const result = this.pagesService.create(page, 'User');

    await this.telegramService.sendMessage('Поступил новый отзыв с сайта');

    return result;
  }

  async findAll(role: string | null) {
    const roles = ['admin', 'user', 'guest'];
    const validatedRole: Role =
      role && roles.includes(role) ? (role as Role) : 'guest';

    const isPublic: number[] = validatedRole === 'admin' ? [0, 1] : [1];

    return await this.reviewRepository.find({
      where: {
        isPublic: In(isPublic),
      },
    });
  }
}
