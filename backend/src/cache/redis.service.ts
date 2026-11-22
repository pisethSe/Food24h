import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis | null = null;

  onModuleInit() {
    if (process.env.REDIS_URL) {
      this.client = new Redis(process.env.REDIS_URL, { lazyConnect: true });
      void this.client.connect().catch(() => undefined);
    }
  }

  async get(key: string) {
    return this.client?.get(key) ?? null;
  }

  async set(key: string, value: string, ttlSeconds?: number) {
    if (!this.client) return;
    if (ttlSeconds) await this.client.set(key, value, 'EX', ttlSeconds);
    else await this.client.set(key, value);
  }

  async onModuleDestroy() {
    await this.client?.quit();
  }
}
