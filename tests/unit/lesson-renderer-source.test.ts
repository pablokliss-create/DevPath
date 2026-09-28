import { expect,test } from 'vitest';import { existsSync } from 'node:fs';
test('lesson renderer and source list exist',()=>{expect(existsSync('src/features/lesson/LessonRenderer.tsx')).toBe(true);expect(existsSync('src/features/sources/SourceList.tsx')).toBe(true);});
