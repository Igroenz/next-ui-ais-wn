export const curriculumPermission = {
  ADMIN: ["view", "detail", "create", "edit", "delete"],
  ADVISOR: ["view", "detail"],
}

export const curriculumDetailPermission = {
  ADMIN: ["view", "create", "edit", "delete"],
  ADVISOR: ["view", "detail"],
  STUDENT: ["view"],
}

export const canAccessCurriculumResource = (
  role: keyof typeof curriculumPermission,
  action: string,
): boolean => curriculumPermission[role]?.includes(action);

export const canAccessCurriculumDetailResource = (
  role: keyof typeof curriculumDetailPermission,
  action: string,
): boolean => curriculumDetailPermission[role]?.includes(action);