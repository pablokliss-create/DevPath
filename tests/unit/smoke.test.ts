import { describe, expect, test } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';

describe('DevPath locale routes', () => {
  test.each(['pt-BR', 'en'])('%s route file exists', (locale) => {
    expect(existsSync('src/app/[locale]/page.tsx')).toBe(true);
    expect(locale.length).toBeGreaterThan(1);
  });
});

test('DevPath brand exists in the application shell', () => {
  expect(readFileSync('src/components/navigation/Header.tsx', 'utf8')).toContain('DevPath');
});

test('package uses ESM for Next source files', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  expect(pkg.type).toBe('module');
});

test('Playwright smoke test preserves locale template strings', () => {
  const source = readFileSync('tests/e2e/home.spec.ts', 'utf8');
  expect(source).toContain('page.goto(`/${locale}`)');
  expect(source).toContain('test(`${locale} home renders DevPath`');
});