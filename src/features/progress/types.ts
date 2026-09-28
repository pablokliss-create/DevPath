import type { Locale } from '@/i18n/config';
export type ThemePreference='system'|'light'|'dark';
export type CheckpointResult={correct:boolean;attempts:number};
export type ProgressWarning='corrupt-data'|'unsupported-version'|'save-failed'|null;
export type ProgressState={version:1;completedLessons:string[];lastLesson:string|null;checkpoints:Record<string,CheckpointResult>;attemptedChallenges:string[];completedChallenges:string[];selectedSpecialization:string|null;language:Locale;theme:ThemePreference;recoveryWarning:ProgressWarning};
export function createEmptyProgress():ProgressState{return{version:1,completedLessons:[],lastLesson:null,checkpoints:{},attemptedChallenges:[],completedChallenges:[],selectedSpecialization:null,language:'pt-BR',theme:'system',recoveryWarning:null};}
