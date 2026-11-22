import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type Pagination = { page: number; perPage: number };

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  private envelope<T>(data: T, message: string, meta?: Record<string, number>) {
    return { success: true, data, message, ...(meta ? { meta } : {}) };
  }

  private decimal(value: unknown, fallback = 0) {
    if (value === null || value === undefined) return fallback;
    return Number(value);
  }

  async getFoods(params: Pagination & {
    popular?: boolean;
    restaurantSlug?: string;
    q?: string;
  }) {
    const page = Math.max(1, params.page || 1);
    const perPage = Math.min(60, Math.max(1, params.perPage || 24));
    const where: Prisma.FoodWhereInput = {
      restaurant: { status: 'approved', ...(params.restaurantSlug ? { slug: params.restaurantSlug } : {}) },
      ...(params.popular ? { popular: true } : {}),
      ...(params.q?.trim()
        ? { OR: [
            { name: { contains: params.q.trim(), mode: 'insensitive' } },
            { description: { contains: params.q.trim(), mode: 'insensitive' } },
          ] }
        : {}),
    };
    const [total, foods] = await this.prisma.$transaction([
      this.prisma.food.count({ where }),
      this.prisma.food.findMany({
        where,
        include: { restaurant: true, menuCategory: true, optionGroups: { include: { choices: true } }, addons: true },
        orderBy: [{ popular: 'desc' }, { id: 'asc' }],
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ]);

    return this.envelope(
      foods.map((food) => this.foodCard(food)),
      'Foods loaded',
      {
        current_page: page,
        per_page: perPage,
        total,
        total_pages: Math.ceil(total / perPage),
      },
    );
  }

  async getFood(id: string) {
    const food = await this.prisma.food.findUnique({
      where: { slug: id },
      include: { restaurant: true, menuCategory: true, optionGroups: { include: { choices: true }, orderBy: { position: 'asc' } }, addons: { orderBy: { position: 'asc' } } },
    });
    if (!food) throw new NotFoundException({ success: false, message: 'Food not found' });
    return this.envelope(this.food(food), 'Food loaded');
  }

  async getRestaurants(params: Pagination & { kind?: 'restaurant' | 'shop' }) {
    const page = Math.max(1, params.page || 1);
    const perPage = Math.min(60, Math.max(1, params.perPage || 24));
    const where: Prisma.RestaurantWhereInput = {
      status: 'approved',
      ...(params.kind ? { kind: params.kind } : {}),
    };
    const [total, restaurants] = await this.prisma.$transaction([
      this.prisma.restaurant.count({ where }),
      this.prisma.restaurant.findMany({
        where,
        include: { city: true, categories: { include: { category: true } }, foods: true },
        orderBy: { name: 'asc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ]);
    return this.envelope(
      restaurants.map((restaurant) => this.restaurant(restaurant)),
      'Restaurants loaded',
      { current_page: page, per_page: perPage, total, total_pages: Math.ceil(total / perPage) },
    );
  }

  async getRestaurant(id: string) {
    const restaurant = await this.prisma.restaurant.findFirst({
      where: { slug: id, status: 'approved' },
      include: {
        city: true,
        categories: { include: { category: true } },
        foods: {
          orderBy: { position: 'asc' },
          include: { menuCategory: true, optionGroups: { include: { choices: true } }, addons: true },
        },
      },
    });
    if (!restaurant) throw new NotFoundException({ success: false, message: 'Restaurant not found' });
    const base = this.restaurant(restaurant);
    return this.envelope({
      ...base,
      foods: restaurant.foods.map((food) => this.food(food)),
      menuCategories: [...new Set(restaurant.foods.map((food) => food.menuCategory.name))],
    }, 'Restaurant loaded');
  }

  private foodCard(food: any) {
    return {
      id: food.slug,
      restaurantSlug: food.restaurant.slug,
      restaurantName: food.restaurant.name,
      category: food.menuCategory.name,
      name: food.name,
      description: food.description,
      price: this.decimal(food.price),
      discountPrice: food.discountPrice == null ? undefined : this.decimal(food.discountPrice),
      emoji: food.emoji,
      imageUrl: food.imageUrl,
      popular: food.popular,
      available: food.available,
      prepMinutes: food.prepMinutes,
      optionGroups: [],
      addons: [],
    };
  }

  private food(food: any) {
    return {
      ...this.foodCard(food),
      optionGroups: (food.optionGroups ?? []).map((group: any) => ({
        id: group.key,
        name: group.name,
        choices: (group.choices ?? []).map((choice: any) => ({
          id: choice.key,
          name: choice.name,
          priceDelta: this.decimal(choice.priceDelta),
        })),
      })),
      addons: (food.addons ?? []).map((addon: any) => ({
        id: addon.key,
        name: addon.name,
        price: this.decimal(addon.price),
      })),
    };
  }

  private restaurant(restaurant: any) {
    const cover = restaurant.logoUrl ||
      restaurant.foods?.find((food: any) => food.imageUrl)?.imageUrl;
    return {
      slug: restaurant.slug,
      name: restaurant.name,
      kind: restaurant.kind,
      tags: (restaurant.categories ?? []).map((entry: any) => entry.category.slug),
      emoji: restaurant.emoji,
      tint: [restaurant.tintFrom || '#00008B', restaurant.tintTo || '#3B5BDB'],
      imageUrl: cover,
      logoUrl: restaurant.logoUrl,
      rating: this.decimal(restaurant.rating),
      reviewCount: restaurant.reviewCount,
      deliveryMinutes: restaurant.deliveryMinutes,
      deliveryFee: this.decimal(restaurant.deliveryFee),
      minimumOrder: this.decimal(restaurant.minimumOrder),
      priceLevel: restaurant.priceLevel,
      distanceKm: this.decimal(restaurant.distanceKm),
      isOpen: restaurant.isOpen,
      acceptsVouchers: restaurant.acceptsVouchers,
      freeDeliveryFirstOrder: restaurant.freeDeliveryFirstOrder,
      promotion: restaurant.promotion,
      pickupDiscountPercent: restaurant.pickupDiscountPercent,
      address: restaurant.address,
      city: restaurant.city?.name,
      description: restaurant.description,
      openingHours: restaurant.openingHours,
      foodsCount: restaurant.foods?.length,
    };
  }
}
