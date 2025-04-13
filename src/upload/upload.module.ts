import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UploadController],
  providers: [UploadService, UsersService],
})
export class UploadModule {}
