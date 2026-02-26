import { featureMeta } from "@/lib/types";
import { curriculumPermission } from "./security";
import { Package } from "lucide-react";

export const curriculumFeatureMeta: featureMeta = {
  key: 'curriculums',
  order: 7,
  route: '/curriculums',
  icon: Package,
  label: {
    ADMIN: "Kurikulum",
    ADVISOR: "Kurikulum",
  },
  permission: curriculumPermission,
};