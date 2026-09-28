import { createEmptyProgress,type ProgressState } from './types';
export function migrateProgress(value:unknown):ProgressState{
 if(!value||typeof value!=='object')return{...createEmptyProgress(),recoveryWarning:'corrupt-data'};
 const raw=value as Record<string,unknown>;
 if(raw.version===1){const base=createEmptyProgress();return{...base,...raw,version:1,completedLessons:Array.isArray(raw.completedLessons)?raw.completedLessons.filter((v):v is string=>typeof v==='string'):[],checkpoints:raw.checkpoints&&typeof raw.checkpoints==='object'?raw.checkpoints as ProgressState['checkpoints']:{},recoveryWarning:null};}
 if(raw.version===0){const base=createEmptyProgress();return{...base,completedLessons:Array.isArray(raw.completed)?raw.completed.filter((v):v is string=>typeof v==='string'):[],lastLesson:typeof raw.last==='string'?raw.last:null};}
 return{...createEmptyProgress(),recoveryWarning:'unsupported-version'};
}
