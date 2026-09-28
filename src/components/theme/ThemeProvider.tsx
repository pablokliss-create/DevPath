'use client';
import { createContext,useContext,useEffect,useMemo,useState,type ReactNode } from 'react';
type Theme='light'|'dark'; type ThemeContextValue={theme:Theme;toggleTheme():void};
const ThemeContext=createContext<ThemeContextValue|null>(null); const STORAGE_KEY='devpath-theme';
function systemTheme():Theme { if(typeof window==='undefined') return 'light'; return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'; }
export function ThemeProvider({children}:{children:ReactNode}) {
  const [theme,setTheme]=useState<Theme>('light');
  useEffect(()=>{ const stored=window.localStorage.getItem(STORAGE_KEY); setTheme(stored==='dark'||stored==='light'?stored:systemTheme()); },[]);
  useEffect(()=>{ document.documentElement.dataset.theme=theme; },[theme]);
  const value=useMemo(()=>({theme,toggleTheme(){setTheme(current=>{const next=current==='dark'?'light':'dark';window.localStorage.setItem(STORAGE_KEY,next);return next;});}}),[theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme(){const context=useContext(ThemeContext);if(!context)throw new Error('useTheme must be used inside ThemeProvider');return context;}
