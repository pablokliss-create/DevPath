import { expect,test } from 'vitest';import { existsSync } from 'node:fs';
test('progress repository boundary exists',()=>{for(const f of ['types.ts','repository.ts','localProgressRepository.ts','service.ts','migrations.ts'])expect(existsSync(`src/features/progress/${f}`)).toBe(true);});
