// Global Permission

export const canAccessFeature = ({
  feature,
  role,
  action = "view"
}: {
  feature: any;
  role: string;
  action?: string;
}): boolean => feature.permission?.[role]?.includes(action);