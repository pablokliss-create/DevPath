import { expect,test } from 'vitest';import { normalizeError } from '@/features/runner/normalizeError';
test('normalizes Error and non Error values',()=>{expect(normalizeError(new TypeError('bad'))).toBe('TypeError: bad');expect(normalizeError('oops')).toBe('oops');});
