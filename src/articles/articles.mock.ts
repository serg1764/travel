import { Injectable } from '@nestjs/common';
import { Article } from './articles.interfaces';

@Injectable()
export class ArticlesMockService {
  private readonly articles: Article[] = [
    { id: '1', title: 'Article 1', url: 'http://example.com/article1' },
    { id: '2', title: 'Article 2', url: 'http://example.com/article2' },
    { id: '3', title: 'Article 3', url: 'http://example.com/article3' },
  ];

  findAll(): Article[] {
    return this.articles;
  }
}
