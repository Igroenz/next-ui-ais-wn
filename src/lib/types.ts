export interface AcademicPeriod {
  id: string,
  year: number,
  semester_type: SEMESTERTYPE,
  academic_state: ACADEMICSTATE,
  created_at: Date,
  updated_at: Date,
};

export interface Major {
  id: string,
  name: string,
  code: string,
  degree: DEGREE,
  created_at: Date,
  updated_at: Date,
  deleted_at?: Date,
};

export interface User {
  id: string,
  name: string,
  email: string,
  username: string,
  password?: string,
  created_at: Date,
  updated_at: Date,
};

export interface Operator {
  id: string,
  name: string,
  employee_id: string,
  department: string,
  role: ROLES,
  userId?: string,
  created_at: Date,
  updated_at: Date,
};

export type OperatorWithUser = Operator & { user?: User };

export interface Lecturer {
  id: string,
  name: string,
  employee_id: string,
  gender: GENDER,
  degree: DEGREE,
  entryYear: string,
  email?: string,
  phone?: string,
  avatar?: string,
  majorId: string,
  role: ROLES,
  userId?: string,
  created_at: Date,
  updated_at: Date,
  deleted_at?: Date,
}

export type LecturerWithUserAndMajor = Lecturer & { user?: User } & { major?: Major }

export enum ROLES {
  ADMIN = 'ADMIN',
  PRODI = 'PRODI',
  FINANCE = 'FINANCE',
  BAAK = 'BAAK',
  LECTURER = 'LECTURER',
  ADVISOR = 'ADVISOR',
  STUDENT = 'STUDENT',
}

export enum GENDER {
  PRIA = "PRIA",
  WANITA = "WANITA",
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
  CLOSE = 'CLOSE',
}