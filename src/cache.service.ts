import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async deleleteByPrefix(prefix: string) {
    const keys = await this.getKeysByPrefix(prefix);

    if (keys.length) {
      await this.cacheManager.store.mdel(...keys);
    }
  }

  async getKeysByPrefix(prefix: string) {
    return this.cacheManager.store.keys(`${prefix}*`);
  }
}
