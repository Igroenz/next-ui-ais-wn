export const studentPermission = {
  ADMIN: ["view", "detail", "create", "edit", "delete"],
  ADVISOR: ["view", "detail"],
}

export const canAccessStudentResource = (
  role: keyof typeof studentPermission,
  action: string,
): boolean => studentPermission[role]?.includes(action);