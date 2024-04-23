import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticlesService {
    findAll(): string {
        return 'This will return all articles';
    }
}
