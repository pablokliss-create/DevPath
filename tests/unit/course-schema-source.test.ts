import { expect,test } from 'vitest'; import { existsSync } from 'node:fs';
test('course schema and catalog exist',()=>{expect(existsSync('src/features/course/schema.ts')).toBe(true);expect(existsSync('src/features/course/catalog.ts')).toBe(true);});
test('representative lessons exist',()=>{for(const name of ['variables','async-errors','client-server-boundaries'])expect(existsSync(`src/content/lessons/${name}.ts`)).toBe(true);});
