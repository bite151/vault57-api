import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { ImageService } from './image.service';

@Controller('images-webp')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('*')
  async convertToWebp(@Req() req: Request, @Res() res: Response) {
    const imageName = req.url.replace('/images-webp/', '');
    return await this.imageService.getWebpImage(imageName, res);
  }
}
