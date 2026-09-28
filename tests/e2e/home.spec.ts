import { test, expect } from '@playwright/test';

for (const locale of ['pt-BR', 'en']) {
  test(`${locale} home renders DevPath`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.getByRole('link', { name: 'DevPath' })).toBeVisible();
  });
}