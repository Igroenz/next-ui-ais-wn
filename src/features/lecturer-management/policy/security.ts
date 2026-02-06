export const lecturerPermission = {
  ADMIN: ["view", "detail", "create", "edit", "delete"],
}

export const canAccessLecturerResource = (
  role: keyof typeof lecturerPermission,
  action: string,
): boolean => lecturerPermission[role]?.includes(action);