// Global Permission

import { featureMeta } from "./types";

export const canAccessFeature = ({
  feature,
  role,
  action = "view"
}: {
  feature: featureMeta;
  role: string;
  action?: string;
}): boolean => feature.permission?.[role]?.includes(action);