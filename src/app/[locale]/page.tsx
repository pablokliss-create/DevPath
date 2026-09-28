import { notFound } from 'next/navigation';import { isLocale } from '@/i18n/config';import { DashboardHome } from '@/features/course/DashboardHome';
export default async function LocalePage({params}:{params:Promise<{locale:string}>}){const{locale}=await params;if(!isLocale(locale))notFound();return <DashboardHome locale={locale}/>;}
