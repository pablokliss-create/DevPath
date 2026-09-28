import { expect,test } from 'vitest';import { existsSync } from 'node:fs';
test('dashboard roadmap glossary and project catalog exist',()=>{for(const f of ['src/features/course/CourseRoadmap.tsx','src/features/glossary/catalog.ts','src/features/projects/catalog.ts'])expect(existsSync(f)).toBe(true);});
