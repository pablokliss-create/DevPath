import { expect,test } from 'vitest';import { readFileSync } from 'node:fs';
test('provider uses repository/service rather than direct lesson storage calls',()=>{const source=readFileSync('src/features/progress/ProgressProvider.tsx','utf8');expect(source).toContain('ProgressService');expect(source).toContain('LocalProgressRepository');});
