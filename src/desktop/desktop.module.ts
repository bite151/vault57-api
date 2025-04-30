import { Module } from '@nestjs/common';
import { DesktopService } from './desktop.service';
import { DesktopController } from './desktop.controller';

@Module({
  controllers: [DesktopController],
  providers: [DesktopService],
})
export class DesktopModule {}
