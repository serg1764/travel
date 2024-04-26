import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './articles.interfaces';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
    constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) {}

    async findAll(): Promise<Article[]> {
        return this.articleModel.find().exec();
    }

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const createdArticle = new this.articleModel(createArticleDto);
        return createdArticle.save();
    }

    async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
        return this.articleModel.findByIdAndUpdate(id, updateArticleDto, { new: true, runValidators: true });
    }
}
