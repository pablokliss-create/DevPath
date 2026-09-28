import type { Locale } from '@/i18n/config';
export function VerificationMeta({checkedAt,version,locale}:{checkedAt:string;version?:string;locale:Locale}){const pt=locale==='pt-BR';return <small className="verificationMeta">{pt?'Verificado em':'Checked on'} {checkedAt}{version?` · ${pt?'versão':'version'} ${version}`:''}</small>;}
