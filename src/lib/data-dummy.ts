import { DEGREE } from "@/features/major-management/types";
import { AcademicState, SemesterType } from "@/features/period-management/types";

export const dataPeriod = [
  {
    id: "1",
    year: 2024,
    semester_type: SemesterType.GANJIL,
    academic_state: AcademicState.CLOSE,
    created_at: new Date(2024, 6, 10, 0, 0, 0),
    updated_at: new Date(2024, 6, 10, 0, 0, 0),
  },
  {
    id: "2",
    year: 2025,
    semester_type: SemesterType.GENAP,
    academic_state: AcademicState.CLOSE,
    created_at: new Date(2025, 0, 10, 0, 0, 0),
    updated_at: new Date(2025, 0, 10, 0, 0, 0),
  },
  {
    id: "3",
    year: 2025,
    semester_type: SemesterType.GANJIL,
    academic_state: AcademicState.ONGOING,
    created_at: new Date(2025, 6, 10, 0, 0, 0),
    updated_at: new Date(2025, 6, 10, 0, 0, 0),
  },
  {
    id: "4",
    year: 2026,
    semester_type: SemesterType.GENAP,
    academic_state: AcademicState.PLANNING,
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
]