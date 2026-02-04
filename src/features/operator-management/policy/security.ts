export const operatorPermission = {
  ADMIN: ["view", "create", "edit", "delete"],
}

export const canAccessOperatorResource = (
  role: keyof typeof operatorPermission,
  action: string,
): boolean => operatorPermission[role]?.includes(action);