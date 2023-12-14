import { CACHE_TTL_METADATA, CacheInterceptor } from '@nestjs/cache-manager';
import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { isFunction, isNil } from 'lodash';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const key = this.trackBy(context);
    if (!key) {
      return next.handle();
    }

    try {
      const value = await this.cacheManager.get(key);
      if (!isNil(value)) {
        return of(value);
      }

      // @CahceTTL() 데코레이터로 작성한 캐시 TTL(Time To Live) 메타데이터 조회
      const ttlValueOrFactory = this.reflector.get(CACHE_TTL_METADATA, context.getHandler()) ?? null;
      const ttl = isFunction(ttlValueOrFactory) ? await ttlValueOrFactory(context) : ttlValueOrFactory;

      return next.handle().pipe(
        tap((response) => {
          // 응답하며 동시에, 응답 데이터 캐싱 처리 진행(입력한 TTL 만큼)
          const args = isNil(ttl) ? [key, response] : [key, response, { ttl }];
          this.cacheManager.set(...args);
        }),
      );
    } catch {
      return next.handle();
    }
  }

  /**
   * GET 요청이 아닐 경우 캐시 x
   */
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const { httpAdapter } = this.httpAdapterHost;

    const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET';
    if (!isGetRequest) {
      return undefined;
    }
    return httpAdapter.getRequestUrl(request);
  }
}
