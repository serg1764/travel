import { Controller, Get, Post, Body } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './articles.interfaces';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('api/articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Get()
    async findAll(): Promise<Article[]> {
        return this.articlesService.findAll();
    }

    @Post()
    async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
        return this.articlesService.create(createArticleDto);
    }
}
