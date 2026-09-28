import { expect,test } from 'vitest';import { existsSync } from 'node:fs';
test('source verification components and validation script exist',()=>{for(const f of ['src/features/sources/SourceBadge.tsx','src/features/sources/VerificationMeta.tsx','scripts/validate-content.ts'])expect(existsSync(f)).toBe(true);});
