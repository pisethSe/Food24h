import { expect, test } from '@playwright/test';

test('customer home renders the Food24h brand', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Food24h/i);
});
