export interface Major {
  id: string,
  name: string,
  code: string,
  degree: DEGREE,
  created_at: Date,
  updated_at: Date,
  deleted_at?: Date,
}

export enum DEGREE {
  D3 = 'D3',
  S1 = 'S1',
  S2 = 'S2',
  S3 = 'S3',
}