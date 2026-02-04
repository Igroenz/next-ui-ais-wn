import { ACADEMICSTATE, DEGREE, ROLES, SEMESTERTYPE } from "./types";

export const dataPeriod = [
  {
    id: "1",
    year: 2024,
    semester_type: SEMESTERTYPE.GANJIL,
    academic_state: ACADEMICSTATE.CLOSE,
    created_at: new Date(2024, 6, 10, 0, 0, 0),
    updated_at: new Date(2024, 6, 10, 0, 0, 0),
  },
  {
    id: "2",
    year: 2025,
    semester_type: SEMESTERTYPE.GENAP,
    academic_state: ACADEMICSTATE.CLOSE,
    created_at: new Date(2025, 0, 10, 0, 0, 0),
    updated_at: new Date(2025, 0, 10, 0, 0, 0),
  },
  {
    id: "3",
    year: 2025,
    semester_type: SEMESTERTYPE.GANJIL,
    academic_state: ACADEMICSTATE.ONGOING,
    created_at: new Date(2025, 6, 10, 0, 0, 0),
    updated_at: new Date(2025, 6, 10, 0, 0, 0),
  },
  {
    id: "4",
    year: 2026,
    semester_type: SEMESTERTYPE.GENAP,
    academic_state: ACADEMICSTATE.PLANNING,
    created_at: new Date(2026, 0, 10, 0, 0, 0),
    updated_at: new Date(2026, 0, 10, 0, 0, 0),
  },
];

export const dataMajor = [
  {
    id: "1",
    code: "SI",
    name: "Sistem Informasi",
    degree: DEGREE.S1,
    created_at: new Date(2026, 0, 10, 0, 0, 0),
    updated_at: new Date(2026, 0, 10, 0, 0, 0),
  },
  {
    id: "2",
    code: "TI",
    name: "Teknik Informatika",
    degree: DEGREE.S1,
    created_at: new Date(2026, 0, 10, 0, 0, 0),
    updated_at: new Date(2026, 0, 10, 0, 0, 0),
  },
];

export const dataOperator = [
  {
    id: "1",
    name: 'alex',
    employee_id: '12345678',
    department: 'Prodi',
    role: ROLES.ADMIN,
    userId: "admin1",
    created_at: new Date(2026, 0, 10, 0, 0, 0),
    updated_at: new Date(2026, 0, 10, 0, 0, 0),
  },
  {
    id: "2",
    name: 'Kaza Orenda',
    employee_id: '123456438',
    department: 'Keuangan',
    role: ROLES.FINANCE,
    userId: "finance1",
    created_at: new Date(2026, 0, 10, 0, 0, 0),
    updated_at: new Date(2026, 0, 10, 0, 0, 0),
  },
  {
    id: "3",
    name: 'Hira Amalia',
    employee_id: '123458587',
    department: 'Akademik',
    role: ROLES.BAAK,
    userId: "baak1",
    created_at: new Date(2026, 0, 10, 0, 0, 0),
    updated_at: new Date(2026, 0, 10, 0, 0, 0),
  },
];