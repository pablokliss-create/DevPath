import { expect,test } from 'vitest';import { readFileSync } from 'node:fs';
test('source list renders authority and verification components',()=>{const source=readFileSync('src/features/sources/SourceList.tsx','utf8');expect(source).toContain('SourceBadge');expect(source).toContain('VerificationMeta');});
