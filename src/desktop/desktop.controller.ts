import { Controller, Get } from '@nestjs/common';
import { DesktopService } from './desktop.service';

@Controller('api/desktop')
export class DesktopController {
  constructor(private readonly desktopService: DesktopService) {}

  @Get()
  findAll() {
    return this.desktopService.findAll();
  }
}
