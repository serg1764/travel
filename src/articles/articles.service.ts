// src/articles/articles.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './articles.interfaces';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { validate } from 'class-validator';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    try {
      const myRes = await this.articleModel.find().exec();
      //console.log(myRes);
      return myRes;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    // Валидация входных данных с использованием class-validator
    const errors = await validate(createArticleDto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    // Создание статьи
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleModel.findByIdAndUpdate(id, updateArticleDto, {
      new: true,
      runValidators: true,
    });
  }

  async findById(id: string): Promise<Article> {
    try {
      const article = await this.articleModel.findById(id).exec();
      if (!article) {
        throw new Error('Article not found');
      }
      return article;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByUrl(url: string): Promise<Article> {
    try {
      const article = await this.articleModel.findOne({ url }).exec();
      if (!article) {
        throw new Error('Article not found');
      }
      return article;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
