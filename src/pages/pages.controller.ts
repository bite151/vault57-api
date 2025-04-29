import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { ResponsePageDto } from './dto/response-page.dto';
import { PageEntity } from './entities/page.entity';
import { IsAuthorization } from '../auth/decorators/is-auth.decorator';
import { IsAuthorized } from '../auth/decorators/is-authorized.decorator';
import { Authorization } from '../auth/decorators/auth.decorator';
import { UserRole } from '../users/entities/user.entity';
import { PageResponse } from './types';
import { Authorized } from '../auth/decorators/authorized.decorator';

@Controller('api/pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Authorization(UserRole.ADMIN)
  @Post()
  create(
    @Body() createPageDto: CreatePageDto,
    @Authorized('name') userName: string,
  ): Promise<PageEntity> {
    return this.pagesService.create(createPageDto, userName);
  }

  @IsAuthorization()
  @Get()
  findAll(@IsAuthorized('role') role: string | null): Promise<PageResponse[]> {
    try {
      return this.pagesService.findAll(role);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Authorization(UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<CreatePageDto> {
    try {
      return this.pagesService.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Authorization(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageDto: ResponsePageDto) {
    try {
      return this.pagesService.update(+id, updatePageDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Authorization(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.pagesService.remove(+id);
      return { id, message: 'Page deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Authorization(UserRole.ADMIN)
  @Post('/delete-array')
  @HttpCode(204)
  async removeArray(@Body() ids: number[]) {
    try {
      await this.pagesService.removeArray(ids);
      return { ids, message: 'Pages deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
