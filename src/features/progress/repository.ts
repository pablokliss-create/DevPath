import type { ProgressState } from './types';
export interface ProgressRepository{load():Promise<ProgressState>;save(state:ProgressState):Promise<void>;}
