import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ImageService } from './image.service';

@Controller('images-webp')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Get(':imageName')
  async convertToWebp(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ) {
    return await this.imageService.getWebpImage(imageName, res);
  }
}
