import { actions } from "@/lib/settings";
import { canAccessCurriculumResource } from "./security";

export const curriculumColumnVisibility = {
  ADMIN: {
    info: true,
    prodi: true,
    action: true,
  },
  ADVISOR: {
    info: true,
    prodi: true,
    action: true,
  }
};

export const curriculumDetailColumnVisibility = {
  ADMIN: {
    matkul: true,
    semester: true,
    action: true,
  },
  ADVISOR: {
    matkul: true,
    semester: true,
    action: true,
  }
};

export const curriculumUI = {
  ADMIN: Object.fromEntries(actions.map((act) => [`can${act}`, canAccessCurriculumResource("ADMIN", act)])),
  ADVISOR: Object.fromEntries(actions.map((act) => [`can${act}`, canAccessCurriculumResource("ADVISOR", act)])),
};

export const curriculumDetailUI = {
  ADMIN: Object.fromEntries(actions.map((act) => [`can${act}`, canAccessCurriculumResource("ADMIN", act)])),
  ADVISOR: Object.fromEntries(actions.map((act) => [`can${act}`, canAccessCurriculumResource("ADVISOR", act)])),
};