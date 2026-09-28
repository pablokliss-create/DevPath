import type { ProgressRepository } from './repository';import { createEmptyProgress,type CheckpointResult,type ProgressState } from './types';
export class ProgressService{
 private state:ProgressState=createEmptyProgress();constructor(private readonly repository:ProgressRepository){}
 get current():ProgressState{return this.state;}
 async load(){this.state=await this.repository.load();return this.state;}
 private async persist(next:ProgressState){this.state=next;try{await this.repository.save(next);}catch{this.state={...next,recoveryWarning:'save-failed'};}return this.state;}
 async completeLesson(slug:string){return this.persist({...this.state,completedLessons:Array.from(new Set([...this.state.completedLessons,slug]))});}
 async recordCheckpoint(id:string,result:CheckpointResult){return this.persist({...this.state,checkpoints:{...this.state.checkpoints,[id]:result}});}
 async setLastLesson(slug:string){return this.persist({...this.state,lastLesson:slug});}
}
