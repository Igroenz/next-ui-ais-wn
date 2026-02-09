import { BriefcaseBusiness } from "lucide-react";
import { majorPermission } from "./security";
import { featureMeta } from "@/lib/types";

export const majorFeatureMeta: featureMeta = {
  key: 'majors',
  order: 2,
  route: '/majors',
  icon: BriefcaseBusiness,
  label: {
    ADMIN: "Program Studi",
  },
  permission: majorPermission,
};