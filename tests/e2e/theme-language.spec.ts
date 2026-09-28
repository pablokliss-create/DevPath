import { test, expect } from '@playwright/test';
test('PT-BR shell exposes navigation, language and theme controls', async ({ page }) => {
  await page.goto('/pt-BR');
  await expect(page.getByRole('navigation', { name: 'Principal' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Curso' })).toHaveAttribute('href', '/pt-BR/course');
  await expect(page.getByRole('button', { name: /tema/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/en');
});
test('English shell keeps route when changing language', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Course' })).toHaveAttribute('href', '/en/course');
  await expect(page.getByRole('link', { name: 'Português' })).toHaveAttribute('href', '/pt-BR');
});
test('manual dark theme persists after reload', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('button', { name: /theme/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
