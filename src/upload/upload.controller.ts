import { Controller, Post, Body, Delete } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { DeleteImageDto } from './dto/delete-image.dto';
import { Authorization } from '../auth/decorators/auth.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('api')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Authorization(UserRole.ADMIN)
  @Post('upload/image')
  async uploadImage(@Body() body: UploadImageDto) {
    const filePath = await this.uploadService.saveBase64Image(body.base64);
    return { message: 'The file has been saved', path: filePath };
  }

  @Authorization(UserRole.ADMIN)
  @Delete('remove/image')
  async deleteImage(@Body() body: DeleteImageDto) {
    const filePath = await this.uploadService.deleteImage(body.path);
    return { message: 'The file has been deleted', path: filePath };
  }
}
