'use client'; import { useTheme } from './ThemeProvider';
export function ThemeToggle({label}:{label:string}) { const {theme,toggleTheme}=useTheme(); return <button type="button" className="iconButton" aria-label={label} onClick={toggleTheme}><span aria-hidden="true">{theme==='dark'?'☀':'☾'}</span></button>; }
