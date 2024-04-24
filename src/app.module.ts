import { Module } from '@nestjs/common';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { ArticlesMockService } from './articles/articles.mock';
import { UploadModule } from './files/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [ArticlesController],
  providers: [ArticlesMockService],
})
export class AppModule {}
