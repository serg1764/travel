// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core'; // Импортируем необходимые зависимости
import { ResultInterceptor } from './common/result.interceptor'; // Импортируем ваш интерцептор
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { ArticleSchema } from './articles/article.schema';
import { UploadModule } from './files/upload.module'; // Импортируем UploadModule

@Module({
  imports: [
    ConfigModule.forRoot(), // Подключим модуль для работы с конфигурационными параметрами
    MongooseModule.forRootAsync({
      // Подключимся к базе данных MongoDB
      imports: [ConfigModule], // Импортируем ConfigModule для доступа к ConfigService
      useFactory: async (configService: ConfigService) => {
        const uri = `mongodb://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}`; // /${configService.get('DB_NAME')}`;
        console.log('MongoDB URI:', uri); // Выводим URI подключения в консоль
        return {
          uri: uri, // Используем переменную DB_NAME для указания имени базы данных
          user: configService.get('MONGO_LOGIN'),
          pass: configService.get('MONGO_PASSWORD'),
        };
        //return { uri: `mongodb://${configService.get('MONGO_LOGIN')}:${configService.get('MONGO_PASSWORD')}@${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/${configService.get('DB_NAME')}` };
      },
      inject: [ConfigService], // Укажем, что нам нужно внедрить ConfigService в useFactory
    }),
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
    UploadModule, // Подключаем UploadModule
  ],
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    {
      provide: APP_INTERCEPTOR, // Указываем, что это интерцептор приложения
      useClass: ResultInterceptor, // Указываем класс интерцептора
    },
  ],
})
export class AppModule {}
