import { BadRequestException, Injectable } from '@nestjs/common';
import { promises, existsSync } from 'fs';
import * as path from 'path';
import * as fileType from 'file-type';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  async saveBase64Image(base64String: string): Promise<string> {
    const matches = base64String.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      throw new BadRequestException('Invalid Base64 format');
    }

    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const fileDetected = await fileType.fromBuffer(buffer);
    if (!fileDetected) {
      throw new BadRequestException('Failed to determine the file type');
    }

    const mimeType = fileDetected.mime;
    const allowedMimeTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ];

    if (!allowedMimeTypes.includes(mimeType)) {
      throw new BadRequestException(
        `The ${mimeType} file format is not supported`,
      );
    }

    const ext = fileDetected.ext;
    const fileName = `${randomUUID()}.${ext}`;
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      'images',
      fileName,
    );

    await promises.mkdir(path.dirname(filePath), { recursive: true });
    await promises.writeFile(filePath, buffer);

    return `/uploads/images/${fileName}`;
  }

  async deleteImage(imageName: string): Promise<{ message: string }> {
    const imagePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      'images',
      imageName,
    );
    const webpPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      'webp',
      `${imageName}.webp`,
    );

    if (!existsSync(imagePath)) {
      throw new BadRequestException('Image not found');
    }

    try {
      await promises.unlink(imagePath);

      if (existsSync(webpPath)) {
        await promises.unlink(webpPath);
      }

      return { message: 'The image has been successfully deleted' };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException('Image deletion error');
    }
  }
}
