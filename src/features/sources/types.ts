export type SourceAuthority='primary'|'supplementary';
export type VerificationStatus={checkedAt:string;version?:string;versionSensitive:boolean;authority:SourceAuthority};
