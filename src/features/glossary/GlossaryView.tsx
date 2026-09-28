import type { Locale } from '@/i18n/config';import { glossary } from './catalog';
export function GlossaryView({locale}:{locale:Locale}){const pt=locale==='pt-BR';return <div className="glossaryGrid">{glossary.map(item=><article className="card" key={item.term.en}><h2>{pt?item.term.ptBR:item.term.en}</h2><p>{pt?item.definition.ptBR:item.definition.en}</p></article>)}</div>;}
