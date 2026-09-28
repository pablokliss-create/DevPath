import { expect, test } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';

test('locale-safe link helper exists', () => {
  expect(existsSync('src/i18n/links.ts')).toBe(true);
});

test('theme provider stores a manual preference and applies it to the document', () => {
  expect(existsSync('src/components/theme/ThemeProvider.tsx')).toBe(true);
  const source = readFileSync('src/components/theme/ThemeProvider.tsx', 'utf8');
  expect(source).toContain('localStorage');
  expect(source).toContain('document.documentElement.dataset.theme');
});