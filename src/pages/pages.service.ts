import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { ResponsePageDto } from './dto/response-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEntity } from './entities/page.entity';
import { In, Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { PageSeoEntity } from './entities/page_seo.entity';
import { PageDesktopEntity } from './entities/page_desktop.entity';
import { PageMobileEntity } from './entities/page_mobile.entity';
import { PageContent, PageResponse } from './types';
import { UploadService } from '../libs/upload/upload.service';

type UserRole = 'admin' | 'user' | 'guest';
type PagePermission = 'public' | 'user' | 'admin';

interface RolePriorities {
  [key: string]: PagePermission[];
}

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(PageEntity)
    private readonly pageRepository: Repository<PageEntity>,
    @InjectRepository(PageSeoEntity)
    private readonly pageSeoRepository: Repository<PageSeoEntity>,
    @InjectRepository(PageDesktopEntity)
    private readonly pageDesktopRepository: Repository<PageDesktopEntity>,
    @InjectRepository(PageMobileEntity)
    private readonly pageMobileRepository: Repository<PageMobileEntity>,
    private readonly uploadService: UploadService,
  ) {}
  async create(data: CreatePageDto, userName: string): Promise<PageEntity> {
    data.createdBy = userName;

    const content: PageContent = JSON.parse(data.content);
    if (content) {
      for (const blockN in content.blocks) {
        if (content.blocks[blockN]?.img) {
          content.blocks[blockN].img = await this.uploadService.saveBase64Image(
            content.blocks[blockN].img,
          );
        }

        if (
          content.blocks[blockN]?.images &&
          content.blocks[blockN]?.images.length > 0
        ) {
          for (const imgN in content.blocks[blockN]?.images) {
            content.blocks[blockN].images[imgN] =
              await this.uploadService.saveBase64Image(
                content.blocks[blockN].images[imgN],
              );
          }
        }
      }
    }

    data.content = JSON.stringify(content);

    const page = this.pageRepository.create(data);
    const result = await this.pageRepository.save(page);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    result.content = this.parsePageContent(result.content);

    return instanceToPlain(result) as PageEntity;
  }

  async findAll(role: string | null): Promise<PageResponse[]> {
    const roles = ['admin', 'user', 'guest'];
    const validatedRole: UserRole =
      role && roles.includes(role) ? (role as UserRole) : 'guest';

    const priorities: RolePriorities = {
      admin: ['public', 'user', 'admin'],
      user: ['public', 'user'],
      guest: ['public'],
    };

    const permissions: PagePermission[] = priorities[validatedRole] ?? [
      'public',
    ];

    const isPublic: number[] = validatedRole === 'admin' ? [0, 1] : [1];

    const pagesRaw = await this.pageRepository.find({
      relations: ['seo', 'desktop', 'mobile'],
      where: {
        permission: In(permissions),
        isPublic: In(isPublic),
      },
    });
    const pages = instanceToPlain(pagesRaw) as PageResponse[];

    return pages.map((page) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument
      page.content = this.parsePageContent(page.content);
      return page;
    });
  }

  async findOne(id: number): Promise<ResponsePageDto> {
    const page = await this.getPageById(id);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    page.content = this.parsePageContent(page.content);

    return instanceToPlain(page) as ResponsePageDto;
  }

  async update(
    id: number,
    updatePageDto: ResponsePageDto,
  ): Promise<ResponsePageDto> {
    const page: PageEntity = await this.getPageById(id);

    const content: PageContent = JSON.parse(updatePageDto.content);
    if (content) {
      for (const blockN in content.blocks) {
        const block = content.blocks[blockN];

        if (block?.img && block.img.match(/^data:(.+);base64,(.+)$/)) {
          block.img = await this.uploadService.saveBase64Image(block.img);
        }

        if (Array.isArray(block?.images) && block.images.length > 0) {
          const updatedImages = await Promise.all(
            block.images.map(async (img) => {
              return img.match(/^data:(.+);base64,(.+)$/)
                ? await this.uploadService.saveBase64Image(img)
                : img;
            }),
          );
          block.images = updatedImages;
        }
        content.blocks[blockN] = block;
      }
    }

    updatePageDto.content = JSON.stringify(content);

    const pageImages = this.getContentImages(page.content);
    const currentImages = this.getContentImages(updatePageDto.content);
    const imagesToDelete = pageImages.filter(
      (img: string) => !currentImages.includes(img),
    );

    Object.assign(page, updatePageDto);

    await this.pageSeoRepository.update(
      { pageId: id },
      updatePageDto.seo || page.seo,
    );

    await this.pageDesktopRepository.update(
      { pageId: id },
      updatePageDto.desktop || page.desktop,
    );

    await this.pageMobileRepository.update(
      { pageId: id },
      updatePageDto.mobile || page.mobile,
    );

    await this.pageRepository.save({
      id,
      parentId: page.parentId,
      url: page.url,
      content: page.content,
      isPublic: page.isPublic,
      range: page.range,
      createdBy: page.createdBy,
    });

    for (const img of imagesToDelete) {
      const fileName: string | undefined = img.split('/').at(-1);
      if (fileName) {
        await this.uploadService.deleteImage(fileName);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    page.content = this.parsePageContent(page.content);

    return instanceToPlain(page) as ResponsePageDto;
  }

  async remove(id: number) {
    const page = await this.getPageById(id);
    const images = this.getContentImages(page.content);

    await this.pageSeoRepository.delete({ pageId: id });
    await this.pageMobileRepository.delete({ pageId: id });
    await this.pageDesktopRepository.delete({ pageId: id });
    await this.pageRepository.delete({ id });

    if (images.length > 0) {
      for (const img of images) {
        const fileName: string | undefined = img.split('/').at(-1);
        if (fileName) {
          await this.uploadService.deleteImage(fileName);
        }
      }
    }
  }

  async getPageById(id: number): Promise<PageEntity> {
    const page = await this.pageRepository.findOne({
      where: { id },
      relations: ['seo', 'desktop', 'mobile'],
    });

    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

  private parsePageContent(content: string | null): any {
    if (!content) {
      return {
        h1: '',
        blocks: [
          {
            type: 'text',
            title: '',
            img: '',
            p: [''],
            images: [],
          },
        ],
      };
    }
    return JSON.parse(content);
  }

  private getContentImages(content: string | null): string[] {
    if (!content) return [];

    const currentContent: PageContent = JSON.parse(content);
    const images: string[] = [];
    for (const n in currentContent.blocks) {
      if (currentContent.blocks[n]?.img) {
        images.push(currentContent.blocks[n].img);
        if (
          currentContent.blocks[n]?.images &&
          currentContent.blocks[n]?.images.length > 0
        ) {
          for (const i in currentContent.blocks[n]?.images) {
            images.push(currentContent.blocks[n].images[i]);
          }
        }
      }
    }

    return images;
  }
}
