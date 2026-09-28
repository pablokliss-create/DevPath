import type { Locale } from '@/i18n/config';
export function SourceBadge({primary,locale}:{primary:boolean;locale:Locale}){const pt=locale==='pt-BR';return <span className={`sourceBadge ${primary?'primary':'supplementary'}`}>{primary?(pt?'Fonte primária':'Primary source'):(pt?'Complementar':'Supplementary')}</span>;}
