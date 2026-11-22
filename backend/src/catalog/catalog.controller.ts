import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('api/v1')
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get('foods')
  getFoods(
    @Query('page') page = '1',
    @Query('per_page') perPage = '24',
    @Query('popular') popular?: string,
    @Query('restaurant_slug') restaurantSlug?: string,
    @Query('q') q?: string,
  ) {
    return this.catalog.getFoods({
      page: Number(page),
      perPage: Number(perPage),
      popular: popular === 'true',
      restaurantSlug,
      q,
    });
  }

  @Get('foods/:id')
  getFood(@Param('id') id: string) {
    return this.catalog.getFood(id);
  }

  @Get('restaurants')
  getRestaurants(
    @Query('page') page = '1',
    @Query('per_page') perPage = '24',
    @Query('kind') kind?: 'restaurant' | 'shop',
  ) {
    return this.catalog.getRestaurants({ page: Number(page), perPage: Number(perPage), kind });
  }

  @Get('restaurants/:id')
  getRestaurant(@Param('id') id: string) {
    return this.catalog.getRestaurant(id);
  }
}
