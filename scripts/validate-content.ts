import { lessons, validateCatalog } from '../src/features/course/catalog';
import { lessonSchema } from '../src/features/course/schema';

export function collectContentIssues(candidates: unknown[] = lessons): string[] {
  const issues: string[] = [];
  const slugs = new Set<string>();
  for (const raw of candidates) {
    const parsed = lessonSchema.safeParse(raw);
    if (!parsed.success) {
      issues.push(`Invalid lesson schema: ${parsed.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('; ')}`);
      continue;
    }
    const lesson = parsed.data;
    if (slugs.has(lesson.slug)) issues.push(`Duplicate lesson slug: ${lesson.slug}`);
    slugs.add(lesson.slug);
    if (!lesson.sources.some(source => source.primary)) issues.push(`${lesson.slug}: missing primary source`);
    const sourceIds = new Set<string>();
    for (const source of lesson.sources) {
      if (sourceIds.has(source.id)) issues.push(`${lesson.slug}: duplicate source id ${source.id}`);
      sourceIds.add(source.id);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(source.checkedAt)) issues.push(`${lesson.slug}: invalid checkedAt for ${source.id}`);
      if (source.versionSensitive && !source.version) issues.push(`${lesson.slug}: version-sensitive source ${source.id} needs version`);
    }
    const blockIds = new Set<string>();
    for (const block of lesson.blocks) {
      if (blockIds.has(block.id)) issues.push(`${lesson.slug}: duplicate block id ${block.id}`);
      blockIds.add(block.id);
    }
  }
  const knownSlugs = new Set<string>();
  for (const raw of candidates) { const parsed = lessonSchema.safeParse(raw); if (parsed.success) knownSlugs.add(parsed.data.slug); }
  for (const raw of candidates) {
    const parsed = lessonSchema.safeParse(raw); if (!parsed.success) continue;
    for (const prerequisite of parsed.data.prerequisites) if (!knownSlugs.has(prerequisite)) issues.push(`${parsed.data.slug}: unknown prerequisite ${prerequisite}`);
    for (const block of parsed.data.blocks) if (block.exercise?.kind === 'multiple-choice' && (!block.exercise.options || block.exercise.options.length < 2)) issues.push(`${parsed.data.slug}: multiple-choice ${block.id} needs at least 2 options`);
  }
  return issues;
}

export function validateContentData(candidates: unknown[] = lessons) {
  if (candidates === lessons) validateCatalog();
  const issues = collectContentIssues(candidates);
  if (issues.length) throw new Error(issues.join(String.fromCharCode(10)));
  return true;
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('/validate-content.ts')) {
  try {
    validateContentData();
    console.log(`Content validation passed: ${lessons.length} lessons checked.`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}