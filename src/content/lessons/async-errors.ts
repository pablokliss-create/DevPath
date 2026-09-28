import type { Lesson } from '@/features/course/schema';

export const asyncErrorsLesson: Lesson = {
  slug: 'async-errors',
  moduleId: 'modern-js',
  title: { ptBR: 'Código assíncrono e erros', en: 'Async code and errors' },
  summary: { ptBR: 'Promises, await e falhas que precisam ser tratadas.', en: 'Promises, await, and failures that must be handled.' },
  prerequisites: ['variables'],
  reviewedAt: '2026-09-28',
  blocks: [
    { id: 'async', type: 'explanation', content: { ptBR: 'Uma Promise representa um resultado que pode chegar depois ou falhar.', en: 'A Promise represents a result that may arrive later or fail.' } },
    { id: 'async-code', type: 'code', language: 'javascript', code: `try {
  const data = await loadData();
} catch (error) {
  console.error(error);
}` },
  ],
  sources: [{ id: 'mdn-promise', title: 'MDN Promise', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise', type: 'official-doc', primary: true, checkedAt: '2026-09-28', versionSensitive: false }],
};