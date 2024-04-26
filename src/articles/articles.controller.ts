import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './articles.interfaces';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

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

    @Patch()
    async update(@Body() updateArticleDto: any): Promise<Article> {
        const { id, ...updateData } = updateArticleDto;
        return this.articlesService.update(id, updateData);
    }

}
