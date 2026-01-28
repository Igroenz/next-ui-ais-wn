import { Miss_Fajardose } from "next/font/google"

export const majorPermission = {
  ADMIN: ["view", "create", "edit", "delete"]
}

export const canAccessMajorResource = (
  role: keyof typeof majorPermission,
  action: string,
): boolean => majorPermission[role]?.includes(action);