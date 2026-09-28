import { test,expect } from '@playwright/test';
test('lesson renders bilingual content, sources and navigation',async({page})=>{await page.goto('/pt-BR/course/variables');await expect(page.getByRole('heading',{name:/Variáveis/})).toBeVisible();await expect(page.getByText('MDN JavaScript Guide: Declarations')).toBeVisible();await expect(page.getByRole('link',{name:/próxima/i})).toHaveAttribute('href','/pt-BR/course/async-errors');});
test('unknown lesson returns not found',async({page})=>{const response=await page.goto('/en/course/does-not-exist');expect(response?.status()).toBe(404);});
