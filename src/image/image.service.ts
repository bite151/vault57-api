import { BadRequestException, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { Response } from 'express';

@Injectable()
export class ImageService {
  async getWebpImage(
    imageName: string,
    res: Response,
  ): Promise<void | Response> {
    const imagePath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'images',
      imageName,
    );
    const webpDirPath = path.join(__dirname, '..', '..', 'uploads', 'webp');
    const webpFilePath = path.join(webpDirPath, `${imageName}.webp`);

    if (!fs.existsSync(imagePath)) {
      throw new BadRequestException('Изображение не найдено');
    }

    if (fs.existsSync(webpFilePath)) {
      return res.sendFile(webpFilePath);
    }

    try {
      const webpBuffer = await sharp(imagePath).webp().toBuffer();

      if (!fs.existsSync(webpDirPath)) {
        await fs.promises.mkdir(webpDirPath, { recursive: true });
      }

      await fs.promises.writeFile(webpFilePath, webpBuffer);

      res.set('Content-Type', 'image/webp');
      res.set('Content-Disposition', `inline; filename=${imageName}.webp`);

      return res.send(webpBuffer);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Ошибка при конвертации изображения');
    }
  }
}
