import type { Lesson } from '@/features/course/schema';

export const variablesLesson: Lesson = {
  slug: 'variables',
  moduleId: 'foundations',
  title: { ptBR: 'Variáveis: onde o programa guarda informações', en: 'Variables: where a program keeps information' },
  summary: { ptBR: 'Entenda valores, atribuição e mudança de estado.', en: 'Understand values, assignment, and changing state.' },
  prerequisites: [],
  reviewedAt: '2026-09-28',
  blocks: [
    { id: 'understand', type: 'explanation', content: { ptBR: 'Uma variável associa um nome a um valor que o programa pode usar. O nome técnico é variável (variable).', en: 'A variable associates a name with a value the program can use.' } },
    { id: 'cash-code', type: 'code', code: `let cash = 20;
cash = cash + 4.5;`, language: 'javascript' },
    { id: 'predict', type: 'exercise', exercise: { kind: 'prediction', prompt: { ptBR: 'Se lemons começa em 10, perde 1 e ganha 3, qual é o valor final?', en: 'If lemons starts at 10, loses 1 and gains 3, what is the final value?' }, answer: '12', explanation: { ptBR: '10 - 1 + 3 = 12. Você acompanha o estado após cada atribuição.', en: '10 - 1 + 3 = 12. Track state after each assignment.' } } },
    { id: 'lab', type: 'exercise', exercise: { kind: 'browser-code', prompt: { ptBR: 'Execute e altere os valores.', en: 'Run it and change the values.' }, starterCode: `let dinheiro = 20;
let preco = 4.5;
dinheiro = dinheiro + preco;
console.log(dinheiro);` } },
  ],
  sources: [{ id: 'mdn-declarations', title: 'MDN JavaScript Guide: Declarations', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations', type: 'official-doc', primary: true, checkedAt: '2026-09-28', versionSensitive: false }],
};