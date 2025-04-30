import { Controller, Get } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('api/gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }
}
