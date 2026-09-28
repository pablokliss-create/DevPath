export type RunLanguage='javascript';
export type RunCodeRequest={language:RunLanguage;code:string;timeoutMs?:number};
export type RunResult={ok:boolean;output:string[];error?:string;timedOut?:boolean};
