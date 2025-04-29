import { Controller, Get, Post, Body, NotFoundException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { IsAuthorization } from '../auth/decorators/is-auth.decorator';
import { IsAuthorized } from '../auth/decorators/is-authorized.decorator';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @IsAuthorization()
  @Get()
  findAll(@IsAuthorized('role') role: string | null) {
    try {
      return this.reviewsService.findAll(role);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
