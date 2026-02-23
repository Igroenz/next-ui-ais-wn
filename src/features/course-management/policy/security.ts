export const assessmentComponentPermission = {
  ADMIN: ["view", "create", "edit", "delete"]
};

export const assessmentModelPermission = {
  ADMIN: ["view", "detail", "create", "edit", "delete"]
};

export const courseTypePermission = {
  ADMIN: ["view", "create", "edit", "delete"]
}

export const coursePermission = {
  ADMIN: ["view", "detail", "create", "edit", "delete"]
}

export const canAccessAssessmentComponentResource = (
  role: keyof typeof assessmentComponentPermission,
  action: string,
): boolean => assessmentComponentPermission[role]?.includes(action);

export const canAccessAssessmentModelResource = (
  role: keyof typeof assessmentModelPermission,
  action: string,
): boolean => assessmentModelPermission[role]?.includes(action);

export const canAccessCourseTypeResource = (
  role: keyof typeof courseTypePermission,
  action: string,
): boolean => courseTypePermission[role]?.includes(action);

export const canAccessCourseResource = (
  role: keyof typeof coursePermission,
  action: string,
): boolean => coursePermission[role]?.includes(action);