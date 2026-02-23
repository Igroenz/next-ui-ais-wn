import { actions } from "@/lib/settings";
import { canAccessAssessmentComponentResource, canAccessAssessmentModelResource, canAccessCourseResource, canAccessCourseTypeResource } from "./security";

export const assessmentComponentColumnVisibility = {
  ADMIN: {
    info: true,
    action: true,
  }
};

export const assessmentComponentUI = {
  ADMIN : Object.fromEntries(actions.map((act) => [`can${act}`, canAccessAssessmentComponentResource("ADMIN", act)])),
}

// Assessment Model
export const assessmentModelColumnVisibility = {
  ADMIN: {
    info: true,
    komponen: true,
    action: true,
  }
};

export const assessmentModelUI = {
  ADMIN : Object.fromEntries(actions.map((act) => [`can${act}`, canAccessAssessmentModelResource("ADMIN", act)])),
}

// Tipe MK
export const courseTypeColumnVisibility = {
  ADMIN: {
    info: true,
    action: true,
  }
};

export const courseTypeUI = {
  ADMIN : Object.fromEntries(actions.map((act) => [`can${act}`, canAccessCourseTypeResource("ADMIN", act)])),
}

// MK
export const courseColumnVisibility = {
  ADMIN: {
    info: true,
    prodi: true,
    tipe: true,
    action: true,
  }
};

export const courseUI = {
  ADMIN : Object.fromEntries(actions.map((act) => [`can${act}`, canAccessCourseResource("ADMIN", act)])),
}