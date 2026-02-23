import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

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

export type LecturerWithUserAndMajor = Lecturer & { user?: User } & { major?: Major };

export interface Student {
  id: string,
  name: string,
  nim: string,
  gender: GENDER,
  entryYear: string,
  register_status: REGISTERSTATUS,
  place_of_birth: string,
  birthday: Date,
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

export type StudentWithUserAndMajor = Student & { user?: User } & { major?: Major };

export interface AssessmentComponent {
  id: string,
  name: string,
  description?: string,
  acronym: string,
  created_at: Date,
  updated_at: Date,
  deleted_at?: Date,
}

export interface AssessmentModel {
  id: string,
  name: string,
  description?: string,
  created_at: Date,
  updated_at: Date,
  deleted_at?: Date,
}

export interface AssessmentModelComponent {
  id: string,
  assessmentModelId: string,
  assessmentModel?: AssessmentModel,
  assessmentComponentId: string,
  assessmentComponent?: AssessmentComponent,
  percentage: number,
  sort_order: number,
  created_at: Date,
  updated_at: Date,
  deleted_at?: Date,
}

export type AssessmentModelWithComponent = AssessmentModel & {
  assessmentModelComponent?: AssessmentModelComponent[]
}

export interface CourseType {
  id: number,
  name: string,
  description?: string,
  created_at: Date,
  updated_at: Date,
  deleted_at?: Date,
}

export interface Course {
  id: string,
  code: string,
  name: string,
  credit: number,
  majorId: string,
  major?: Major,
  assessmentModelId: string,
  assessmentModel?: AssessmentModelWithComponent,
  courseTypeId: number,
  courseType?: CourseType,
  validFrom: Date,
  validTo?: Date,
  predecessorId?: string,
  predecessor?: Course,
  created_at: Date,
  updated_at: Date,
  deleted_at?: Date,
}

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

export enum REGISTERSTATUS {
  NEW = 'NEW',
  CREDIT_TRANSFER = 'CREDIT_TRANSFER',
  RENIM = 'RENIM',
  CREDIT_ACQUISITION = 'CREDIT_ACQUISITION'
}

// Types Feature
export interface featureMeta {
  key: string;
  order: number;
  route: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  label: {
      [key: string]: string;
  };
  permission: {
      [key: string]: string[];
  };
  nested?: {
    key: string;
    order: number;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    route: string;
    label: {
      [key: string]: string;
    };
    permission: {
      [key: string]: string[];
    };
  }[];
};