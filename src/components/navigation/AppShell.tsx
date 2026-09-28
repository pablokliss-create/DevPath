import type { ReactNode } from 'react'; import type { Locale } from '@/i18n/config'; import { ThemeProvider } from '@/components/theme/ThemeProvider'; import { Header } from './Header';
export function AppShell({locale,children}:{locale:Locale;children:ReactNode}){return <ThemeProvider><Header locale={locale}/><div className="appFrame">{children}</div></ThemeProvider>;}
