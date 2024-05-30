// src/files/upload.module.ts

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Папка для сохранения загруженных файлов
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
