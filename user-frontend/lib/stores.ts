"use client";

import { createPersistentStore } from "@/lib/store";
import type { Address, Cart, Currency, Locale, Order, Profile } from "@/types";

export const preferencesStore = createPersistentStore<{ locale: Locale; currency: Currency }>(
  "food24h:preferences",
  { locale: "en", currency: "USD" }
);

export const cartStore = createPersistentStore<Cart>("food24h:cart", {
  restaurantSlug: null,
  lines: [],
});

export const favoritesStore = createPersistentStore<{ restaurants: string[]; foods: string[] }>(
  "food24h:favorites",
  { restaurants: [], foods: [] }
);

export const addressesStore = createPersistentStore<Address[]>("food24h:addresses", []);

export const ordersStore = createPersistentStore<Order[]>("food24h:orders", []);

export const recentlyViewedStore = createPersistentStore<string[]>("food24h:recent", []);

export const profileStore = createPersistentStore<Profile>("food24h:profile", {
  name: "",
  phone: "",
  email: "",
});

export function toggleFavorite(type: "restaurants" | "foods", id: string) {
  favoritesStore.set((previous) => {
    const list = previous[type];
    return {
      ...previous,
      [type]: list.includes(id) ? list.filter((item) => item !== id) : [id, ...list],
    };
  });
}

export function markRecentlyViewed(slug: string) {
  recentlyViewedStore.set((previous) =>
    [slug, ...previous.filter((item) => item !== slug)].slice(0, 8)
  );
}
