import { notFound } from 'next/navigation';
const locales = new Set(['pt-BR', 'en']);
export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.has(locale)) notFound();
  const title = locale === 'pt-BR' ? 'DevPath - aprenda programacao entendendo de verdade' : 'DevPath - learn programming by truly understanding it';
  return <main><h1>{title}</h1></main>;
}
