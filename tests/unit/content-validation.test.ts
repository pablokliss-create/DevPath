import { expect,test } from 'vitest';import { collectContentIssues,validateContentData } from '../../scripts/validate-content';import { lessons } from '@/features/course/catalog';
test('current representative catalog passes validation',()=>{expect(validateContentData()).toBe(true);});
test('missing primary source is rejected',()=>{const bad=structuredClone(lessons);bad[0].sources=bad[0].sources.map(source=>({...source,primary:false}));expect(collectContentIssues(bad)).toContain('variables: missing primary source');});
test('version-sensitive source without version is rejected',()=>{const bad=structuredClone(lessons);bad[2].sources[0].version=undefined;expect(collectContentIssues(bad).some(issue=>issue.includes('needs version'))).toBe(true);});
test('language parity/schema mismatch is rejected',()=>{const bad:any=structuredClone(lessons);delete bad[0].title.en;expect(collectContentIssues(bad)[0]).toMatch(/Invalid lesson schema/);});
test('duplicate IDs are rejected',()=>{const bad=structuredClone(lessons);bad[0].blocks.push(structuredClone(bad[0].blocks[0]));expect(collectContentIssues(bad)).toContain('variables: duplicate block id understand');});
