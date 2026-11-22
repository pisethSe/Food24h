-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameKm" TEXT NOT NULL,
    "emoji" TEXT,
    "kind" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Restaurant" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'restaurant',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "description" TEXT,
    "emoji" TEXT,
    "tintFrom" TEXT,
    "tintTo" TEXT,
    "rating" DECIMAL(2,1) NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "deliveryMinutes" INTEGER NOT NULL DEFAULT 30,
    "deliveryFee" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "minimumOrder" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "priceLevel" INTEGER NOT NULL DEFAULT 1,
    "distanceKm" DECIMAL(6,2),
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "acceptsVouchers" BOOLEAN NOT NULL DEFAULT true,
    "freeDeliveryFirstOrder" BOOLEAN NOT NULL DEFAULT false,
    "promotion" TEXT,
    "pickupDiscountPercent" INTEGER,
    "address" TEXT,
    "cityId" INTEGER,
    "openingHours" TEXT,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RestaurantCategory" (
    "restaurantId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "RestaurantCategory_pkey" PRIMARY KEY ("restaurantId","categoryId")
);

-- CreateTable
CREATE TABLE "public"."MenuCategory" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MenuCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Food" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "menuCategoryId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "discountPrice" DECIMAL(10,2),
    "emoji" TEXT,
    "imageUrl" TEXT,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "prepMinutes" INTEGER NOT NULL DEFAULT 15,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodOptionGroup" (
    "id" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FoodOptionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodOptionChoice" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceDelta" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FoodOptionChoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodAddon" (
    "id" SERIAL NOT NULL,
    "foodId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FoodAddon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Deal" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "restaurantId" INTEGER NOT NULL,
    "section" TEXT NOT NULL DEFAULT 'food',
    "tintFrom" TEXT,
    "tintTo" TEXT,
    "emoji" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Coupon" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "discountType" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "minimumOrder" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "maximumDiscount" DECIMAL(10,2),
    "usageLimit" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "public"."City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "public"."Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "public"."Restaurant"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MenuCategory_restaurantId_name_key" ON "public"."MenuCategory"("restaurantId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Food_slug_key" ON "public"."Food"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FoodOptionGroup_foodId_key_key" ON "public"."FoodOptionGroup"("foodId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "FoodOptionChoice_groupId_key_key" ON "public"."FoodOptionChoice"("groupId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "FoodAddon_foodId_key_key" ON "public"."FoodAddon"("foodId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "Deal_key_key" ON "public"."Deal"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "public"."Coupon"("code");

-- AddForeignKey
ALTER TABLE "public"."Restaurant" ADD CONSTRAINT "Restaurant_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "public"."City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RestaurantCategory" ADD CONSTRAINT "RestaurantCategory_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "public"."Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RestaurantCategory" ADD CONSTRAINT "RestaurantCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MenuCategory" ADD CONSTRAINT "MenuCategory_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "public"."Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Food" ADD CONSTRAINT "Food_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "public"."Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Food" ADD CONSTRAINT "Food_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "public"."MenuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodOptionGroup" ADD CONSTRAINT "FoodOptionGroup_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodOptionChoice" ADD CONSTRAINT "FoodOptionChoice_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."FoodOptionGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodAddon" ADD CONSTRAINT "FoodAddon_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Deal" ADD CONSTRAINT "Deal_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "public"."Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

