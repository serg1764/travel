// src/articles/articles.service.ts

import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
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
      // Искусственно создаем ошибку для тестирования
      //throw new InternalServerErrorException('Simulated database error');

      const myRes = await this.articleModel.find().exec();
      //console.log('дошли сюдой');
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
    try {
      // Искусственно создаем ошибку для тестирования
      //throw new BadRequestException('Simulated validation error');

      const createdArticle = new this.articleModel(createArticleDto);
      return createdArticle.save();
    } catch (error) {
      console.log('сюда попали111090990111');
      throw new InternalServerErrorException('Failed to create article');
      //throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    // Искусственно создаем ошибку для тестирования
    //throw new BadRequestException('Simulated validation error');

    // Проверка наличия id и данных для обновления
    if (!id || !updateArticleDto) {
      throw new BadRequestException('Invalid input');
    }

    // Проверка валидации данных для обновления
    const errors = await validate(updateArticleDto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    try {
      const updatedArticle = await this.articleModel
        .findByIdAndUpdate(id, updateArticleDto, {
          new: true,
          runValidators: true,
        })
        .exec();

      if (!updatedArticle) {
        //console.log('cсюда попали - 888');
        throw new Error('Article not found');
      }

      return updatedArticle;
    } catch (error) {
      //console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string): Promise<Article> {
    try {
      const article = await this.articleModel.findById(id).exec();
      if (!article) {
        throw new Error('Article not found by ID');
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
        throw new Error('Article not found by ID and URL');
      }
      return article;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
