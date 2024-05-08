// src/common/result.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      mergeMap((data) => {
        let result = true;
        let error = '';
        let mongoData = data.mongoData;
        //console.log(mongoData);
        //console.log(data);

        if (
          data instanceof BadGatewayException ||
          data instanceof InternalServerErrorException ||
          data instanceof BadRequestException
        ) {
          result = false;
          error = data.message;
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
        const errorMessage =
          error instanceof Error ? error.message : 'Internal server error';
        return throwError({
          result: false,
          error: errorMessage,
          mongoData: null,
        });
      }),
    );
  }
}
