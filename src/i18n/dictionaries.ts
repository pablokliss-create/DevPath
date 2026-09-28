import type { Locale } from './config';
export const dictionaries = {
  'pt-BR': { navLabel:'Principal', home:'Início', course:'Curso', laboratory:'Laboratório', projects:'Projetos', glossary:'Glossário', progress:'Progresso', theme:'Alternar tema', otherLanguage:'English' },
  en: { navLabel:'Main', home:'Home', course:'Course', laboratory:'Laboratory', projects:'Projects', glossary:'Glossary', progress:'Progress', theme:'Toggle theme', otherLanguage:'Português' },
} as const satisfies Record<Locale, Record<string,string>>;
