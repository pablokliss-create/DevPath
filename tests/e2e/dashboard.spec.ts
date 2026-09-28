import { test, expect } from '@playwright/test';

test('home shows recommended next step and specializations', async ({ page }) => {
  await page.goto('/pt-BR');
  await expect(page.getByRole('heading', { name: /continue sua trilha/i })).toBeVisible();
  await expect(page.getByText('Web Full Stack')).toBeVisible();
  await expect(page.getByRole('link', { name: /começar variáveis/i })).toHaveAttribute('href', '/pt-BR/course/variables');
});

test('course map remains usable on narrow screens and lessons are unlocked', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en/course');
  await expect(page.getByText('Professional core', { exact: true })).toBeVisible();
  const first = page.getByRole('link', { name: /Variables:/ });
  await expect(first).toBeVisible();
  await expect(first).toHaveAttribute('href', '/en/course/variables');
  await expect(page.locator('.roadmap')).toHaveCSS('display', 'grid');
});

test('glossary and projects have bilingual curated content', async ({ page }) => {
  await page.goto('/pt-BR/glossary');
  await expect(page.getByRole('heading', { name: 'Variável' })).toBeVisible();
  await page.goto('/en/projects');
  await expect(page.getByRole('heading', { name: 'rei-da-limonada-rio' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'roblox-fps-pvp' })).toBeVisible();
});