export interface AcademicPeriod {
  id: string,
  year: number,
  semester_type: SEMESTERTYPE,
  academic_state: ACADEMICSTATE,
  created_at: Date,
  updated_at: Date,
}

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

export enum SEMESTERTYPE {
  GANJIL = 'GANJIL',
  GANJIL_PENDEK = 'GANJIL PENDEK',
  GENAP = 'GENAP',
  GENAP_PENDEK = 'GENAP PENDEK',
}

export enum ACADEMICSTATE {
  PLANNING = 'PLANNING',
  ONGOING = 'ONGOING',
  CLOSE = "CLOSE",
}