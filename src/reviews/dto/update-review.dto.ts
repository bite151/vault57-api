import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsOptional()
  userId: number;

  @IsString()
  @IsNotEmpty()
  review: string;

  @IsInt()
  @IsOptional()
  rating: number;

  @IsInt()
  @IsOptional()
  isPublic: number;

  @IsString()
  @IsOptional()
  editedBy: string;
}
