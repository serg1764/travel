import { Controller, Get } from '@nestjs/common';
//import { ArticlesService } from './articles.service';
import { Article } from './article.interface';
import { ArticlesMockService } from './articles.mock';

@Controller('api/articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesMockService) {}

    @Get()
    findAll(): Article[] {
        return this.articlesService.findAll();
    }
}