import { PartialType } from '@nestjs/swagger';
import { CreateDesktopDto } from './create-desktop.dto';

export class UpdateDesktopDto extends PartialType(CreateDesktopDto) {}
