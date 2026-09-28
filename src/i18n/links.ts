import type { Locale } from './config';
export function localizeHref(locale: Locale, href: string): string { const normalized=href.startsWith('/')?href:`/${href}`; return normalized==='/'?`/${locale}`:`/${locale}${normalized}`; }
export function swapLocaleInPath(pathname: string, locale: Locale): string { const parts=pathname.split('/').filter(Boolean); if(parts[0]==='pt-BR'||parts[0]==='en') parts[0]=locale; else parts.unshift(locale); return `/${parts.join('/')}`; }
