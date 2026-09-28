import type { ProgressRepository } from './repository';import { createEmptyProgress,type ProgressState } from './types';import { migrateProgress } from './migrations';
export class LocalProgressRepository implements ProgressRepository{
 constructor(private readonly storage:Pick<Storage,'getItem'|'setItem'>,private readonly key='devpath-progress'){}
 async load():Promise<ProgressState>{const raw=this.storage.getItem(this.key);if(!raw)return createEmptyProgress();try{return migrateProgress(JSON.parse(raw));}catch{return{...createEmptyProgress(),recoveryWarning:'corrupt-data'};}}
 async save(state:ProgressState):Promise<void>{this.storage.setItem(this.key,JSON.stringify({...state,recoveryWarning:null}));}
}
