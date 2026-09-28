import { expect,test } from 'vitest';import { existsSync,readFileSync } from 'node:fs';
test('exercise renderer and isolated runner exist',()=>{expect(existsSync('src/features/exercises/ExerciseRenderer.tsx')).toBe(true);expect(existsSync('src/features/runner/browserRunner.ts')).toBe(true);});
test('main-thread runner never evaluates learner code directly',()=>{const source=readFileSync('src/features/runner/browserRunner.ts','utf8');expect(source).not.toContain('new Function');expect(source).not.toContain('eval(');});
