// src/files/upload.controller.ts

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ArticlesService } from '../articles/articles.service';
import { Article } from '../articles/articles.interfaces';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly articlesService: ArticlesService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file, @Body('id') id: string) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }
    console.log('попали в UploadFile ');

    let article: Article;
    console.log(id);
    if (id) {
      // Используем сервис для обновления статьи
      article = await this.articlesService.update(id, { picture: file.path });
    }

    return {
      filename: file.filename,
      path: file.path,
      articleId: id || null,
      result: true,
    };
  }
}
