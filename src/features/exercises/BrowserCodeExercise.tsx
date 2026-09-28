'use client';

import { useState } from 'react';
import type { LessonBlock } from '@/features/course/schema';
import type { Locale } from '@/i18n/config';
import { runCode } from '@/features/runner/browserRunner';
import { useProgress } from '@/features/progress/ProgressProvider';

export function BrowserCodeExercise({ block, locale, lessonSlug }: { block: LessonBlock; locale: Locale; lessonSlug: string }) {
  const ex = block.exercise!;
  const pt = locale === 'pt-BR';
  const [code, setCode] = useState(ex.starterCode ?? '');
  const [result, setResult] = useState('');
  const [running, setRunning] = useState(false);
  const { recordCheckpoint } = useProgress();

  const execute = async () => {
    setRunning(true);
    const run = await runCode({ language: 'javascript', code });
    setRunning(false);
    const text = run.timedOut
      ? (pt ? 'A execução excedeu o tempo limite (timed out).' : 'Execution timed out.')
      : run.ok
        ? run.output.join(String.fromCharCode(10))
        : run.error ?? (pt ? 'Erro desconhecido' : 'Unknown error');
    setResult(text || (pt ? 'Executado sem saída.' : 'Executed with no output.'));
    await recordCheckpoint(`${lessonSlug}:${block.id}`, { correct: run.ok, attempts: 1 });
  };

  return <section className="exerciseBlock browserLab"><p>{pt ? ex.prompt.ptBR : ex.prompt.en}</p><label>{pt ? 'Editor de código' : 'Code editor'}<textarea aria-label={pt ? 'Editor de código' : 'Code editor'} value={code} onChange={event => setCode(event.target.value)} spellCheck={false} /></label><button type="button" onClick={execute} disabled={running}>{running ? (pt ? 'Executando…' : 'Running…') : (pt ? 'Executar código' : 'Run code')}</button>{result && <pre className="labOutput" role="status">{result}</pre>}</section>;
}