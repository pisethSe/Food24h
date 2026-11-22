import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { CatalogController } from './catalog/catalog.controller';
import { CatalogService } from './catalog/catalog.service';
import { OrdersGateway } from './realtime/orders.gateway';
import { StorageService } from './storage/storage.service';
import { RedisService } from './cache/redis.service';

@Module({
  imports: [],
  controllers: [AppController, CatalogController],
  providers: [AppService, PrismaService, CatalogService, OrdersGateway, StorageService, RedisService],
})
export class AppModule {}
