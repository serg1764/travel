import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { ArticlesService } from '../articles/articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from '../articles/article.schema'; // Предполагая, что вы импортируете схему статьи

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Папка для сохранения загруженных файлов
    }),
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]), // Добавляем ArticleModel в провайдеры UploadModule
  ],
  controllers: [UploadController],
  providers: [ArticlesService],
})
export class UploadModule {}
