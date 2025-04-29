import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  review: string;
}
