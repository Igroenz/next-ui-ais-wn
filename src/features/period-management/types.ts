export interface AcademicPeriod {
  id: string,
  year: number,
  semester_type: SemesterType,
  academic_state: AcademicState,
  created_at: Date,
  updated_at: Date,
}

export enum SemesterType {
  GANJIL = 'GANJIL',
  GANJIL_PENDEK = 'GANJIL PENDEK',
  GENAP = 'GENAP',
  GENAP_PENDEK = 'GENAP PENDEK',
}

export enum AcademicState {
  PLANNING = 'PLANNING',
  ONGOING = 'ONGOING',
  CLOSE = "CLOSE",
}