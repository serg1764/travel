// src/articles/articles.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './articles.interfaces';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ResultInterceptor } from '../common/result.interceptor'; // Импортируйте ваш интерцептор
import { Types } from 'mongoose';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  //@UseInterceptors(ResultInterceptor) // Примените интерцептор к этому методу
  async findAll(): Promise<{
    result: boolean;
    error: string;
    data: Article[];
  }> {
    try {
      const articles = await this.articlesService.findAll();
      return { result: true, error: '', data: articles };
    } catch (error) {
      return { result: false, error: error.message, data: [] };
    }
  }

  @Post()
  //@UseInterceptors(ResultInterceptor) // Примените интерцептор к этому методу
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }

  @Patch()
  //@UseInterceptors(ResultInterceptor) // Примените интерцептор к этому методу
  async update(@Body() updateArticleDto: any): Promise<Article> {
    const { id, ...updateData } = updateArticleDto;
    return this.articlesService.update(id, updateData);
  }

  @Get(':idOrUrl') // Общий маршрут без префиксов
  async findByIdOrUrl(@Param('idOrUrl') idOrUrl: string): Promise<Article> {
    let article: Article;

    // Проверяем, является ли idOrUrl идентификатором MongoDB
    if (Types.ObjectId.isValid(idOrUrl)) {
      // Если idOrUrl является идентификатором MongoDB, пытаемся найти статью по ID
      article = await this.articlesService.findById(idOrUrl);
    }

    // Если статья не найдена по ID или idOrUrl не является идентификатором MongoDB,
    // пытаемся найти статью по уникальному URL
    if (!article) {
      article = await this.articlesService.findByUrl(idOrUrl);
    }

    // Если статья не найдена ни по ID, ни по URL, выбрасываем исключение
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }
}
