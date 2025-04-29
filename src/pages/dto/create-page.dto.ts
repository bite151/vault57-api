import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsHexColor,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ItemType, UserRole } from '../entities/page.entity';

class PageSeoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}

class PageDesktopDto {
  @IsString()
  @IsOptional()
  icon: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  contentComponent: string;

  // @Transform(({ value }) => Boolean(value))
  @IsInt()
  @IsOptional()
  showInFinder: number;

  // @Transform(({ value }) => Boolean(value))
  @IsInt()
  @IsOptional()
  resetWidth: number;

  // @Transform(({ value }) => Boolean(value))
  @IsInt()
  @IsOptional()
  hideStatusBar: number;

  @IsString()
  @IsOptional()
    // @IsHexColor()
  background: string;
}

class PageMobileDto {
  @IsString()
  @IsOptional()
  icon: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  shortTitle: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  contentComponent: string;

  // @Transform(({ value }) => Boolean(value))
  @IsInt()
  @IsOptional()
  showInLauncher: number;

  // @Transform(({ value }) => Boolean(value))
  @IsInt()
  @IsOptional()
  loadParentScreens: number;

  @IsString()
  @IsOptional()
  // @IsHexColor()
  background: string;
}

export class CreatePageDto {
  @IsInt()
  @IsOptional()
  parentId: number;

  @IsString()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  content: string;

  // @Transform(({ value }) => Boolean(value))
  @IsInt()
  @IsOptional()
  isPublic: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  range: number;

  @IsString()
  @IsOptional()
  permission: UserRole;

  @IsString()
  @IsOptional()
  type: ItemType;

  @IsString()
  @IsOptional()
  createdBy: string;

  @IsString()
  @IsOptional()
  createdAt: string;

  @IsString()
  @IsOptional()
  updatedAt: string;

  @ValidateNested()
  @Type(() => PageSeoDto)
  seo: PageSeoDto;

  @ValidateNested()
  @Type(() => PageDesktopDto)
  desktop: PageDesktopDto;

  @ValidateNested()
  @Type(() => PageMobileDto)
  mobile: PageMobileDto;
}
