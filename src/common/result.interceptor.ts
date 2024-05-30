// src/common/result.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isFileUpload = context.getHandler().name === 'uploadFile'; // Проверяем, является ли метод контроллера методом загрузки файла

    if (isFileUpload) {
      return next.handle().pipe(
        mergeMap((data) => {
          const filename = data.filename;
          const path = data.path;
          const articleId = data.articleId;
          let result = data.result;
          let error = '';
          let mongoData = data.mongoData;

          if (data.result === false && data.error) {
            result = false;
            error = data.error;
            mongoData = null;
          } else if (data && data.toObject) {
            mongoData = data.toObject();
          } else if (data && !data.toObject) {
            mongoData = data.data;
          }

          return of({
            result,
            path,
            articleId,
            filename,
            mongoData,
            error,
          });
        }),
        catchError((error) => {
          console.log('Error in uploadFile:', error);

          if (error.code === 'LIMIT_FILE_SIZE') {
            throw new HttpException('File too large', HttpStatus.BAD_REQUEST);
          }

          const errorMessage =
            error instanceof Error ? error.message : 'Internal server error';
          return of({
            result: false,
            error: errorMessage,
            mongoData: null,
          });
        }),
      );
    }

    return next.handle().pipe(
      mergeMap((data) => {
        let result = true;
        let error = '';
        let mongoData = data.mongoData;
        //console.log(mongoData);
        console.log(data);

        if (data.result === false && data.error) {
          result = false;
          error = data.error;
          mongoData = null;
        } else if (data && data.toObject) {
          mongoData = data.toObject();
          console.log(mongoData);
          console.log(typeof mongoData);
        } else if (data && !data.toObject) {
          mongoData = data.data;
          //console.log(mongoData);
          console.log(typeof mongoData);
          console.log('re1');
        }

        return of({
          mongoData,
          result,
          error,
        });
      }),
      catchError((error) => {
        console.log('В catchError попали');

        if (error.code === 11000) {
          error.message = 'URL already exists';
        }

        const errorMessage =
          error instanceof Error ? error.message : 'Internal server error';
        return /*throwError*/ of({
          result: false,
          error: errorMessage,
          mongoData: null,
        });
      }),
    );
  }
}
