import { PrismaClient } from '@prisma/client';
import catalog from './catalog.json';

const prisma = new PrismaClient();

async function main() {
  for (const cityName of catalog.cities) {
    await prisma.city.upsert({
      where: { name: cityName },
      update: {},
      create: { name: cityName, position: catalog.cities.indexOf(cityName) },
    });
  }

  for (const cuisine of catalog.cuisines) {
    await prisma.category.upsert({
      where: { slug: cuisine.slug },
      update: {},
      create: {
        slug: cuisine.slug,
        name: cuisine.name,
        nameKm: cuisine.nameKm,
        emoji: cuisine.emoji,
        kind: 'cuisine',
      },
    });
  }

  for (const shopType of catalog.shopTypes) {
    await prisma.category.upsert({
      where: { slug: shopType.slug },
      update: {},
      create: {
        slug: shopType.slug,
        name: shopType.name,
        nameKm: shopType.nameKm,
        emoji: shopType.emoji,
        kind: 'shop_type',
      },
    });
  }

  for (const restaurant of catalog.restaurants) {
    const city = await prisma.city.findUnique({ where: { name: restaurant.city } });
    const created = await prisma.restaurant.upsert({
      where: { slug: restaurant.slug },
      update: {},
      create: {
        slug: restaurant.slug,
        name: restaurant.name,
        kind: restaurant.kind,
        status: 'approved',
        description: restaurant.description,
        emoji: restaurant.emoji,
        tintFrom: restaurant.tint?.[0],
        tintTo: restaurant.tint?.[1],
        rating: restaurant.rating,
        reviewCount: restaurant.reviewCount,
        deliveryMinutes: restaurant.deliveryMinutes,
        deliveryFee: restaurant.deliveryFee,
        minimumOrder: restaurant.minimumOrder,
        priceLevel: restaurant.priceLevel,
        distanceKm: restaurant.distanceKm,
        isOpen: restaurant.isOpen,
        acceptsVouchers: restaurant.acceptsVouchers,
        freeDeliveryFirstOrder: restaurant.freeDeliveryFirstOrder,
        promotion: restaurant.promotion,
        pickupDiscountPercent: restaurant.pickupDiscountPercent,
        address: restaurant.address,
        cityId: city?.id,
        openingHours: restaurant.openingHours,
      },
    });

    for (const tag of restaurant.tags ?? []) {
      const category = await prisma.category.findUnique({ where: { slug: tag } });
      if (category) {
        await prisma.restaurantCategory.upsert({
          where: { restaurantId_categoryId: { restaurantId: created.id, categoryId: category.id } },
          update: {},
          create: { restaurantId: created.id, categoryId: category.id },
        });
      }
    }
  }

  for (const food of catalog.foods) {
    const restaurant = await prisma.restaurant.findUnique({ where: { slug: food.restaurantSlug } });
    if (!restaurant) continue;
    const menuCategory = await prisma.menuCategory.upsert({
      where: { restaurantId_name: { restaurantId: restaurant.id, name: food.category } },
      update: {},
      create: { restaurantId: restaurant.id, name: food.category },
    });
    const created = await prisma.food.upsert({
      where: { slug: food.id },
      update: {},
      create: {
        slug: food.id,
        restaurantId: restaurant.id,
        menuCategoryId: menuCategory.id,
        name: food.name,
        description: food.description,
        price: food.price,
        emoji: food.emoji,
        popular: food.popular,
        available: food.available,
        prepMinutes: food.prepMinutes,
      },
    });

    for (const [groupIndex, group] of (food.optionGroups ?? []).entries()) {
      const createdGroup = await prisma.foodOptionGroup.upsert({
        where: { foodId_key: { foodId: created.id, key: group.id } },
        update: {},
        create: { foodId: created.id, key: group.id, name: group.name, position: groupIndex },
      });
      for (const [choiceIndex, choice] of group.choices.entries()) {
        await prisma.foodOptionChoice.upsert({
          where: { groupId_key: { groupId: createdGroup.id, key: choice.id } },
          update: {},
          create: {
            groupId: createdGroup.id,
            key: choice.id,
            name: choice.name,
            priceDelta: choice.priceDelta,
            position: choiceIndex,
          },
        });
      }
    }

    for (const [addonIndex, addon] of (food.addons ?? []).entries()) {
      await prisma.foodAddon.upsert({
        where: { foodId_key: { foodId: created.id, key: addon.id } },
        update: {},
        create: { foodId: created.id, key: addon.id, name: addon.name, price: addon.price, position: addonIndex },
      });
    }
  }

  console.log(`Seeded ${catalog.cities.length} cities, ${catalog.restaurants.length} restaurants and ${catalog.foods.length} foods`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
