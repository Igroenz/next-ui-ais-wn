export const periodPermissions : {[key: string]: string[]} = {
  ADMIN: ["view", "create", "edit", "delete"],
};

export const canAccessPeriodResource = (
  role: keyof typeof periodPermissions,
  action: string,
): boolean => periodPermissions[role]?.includes(action)