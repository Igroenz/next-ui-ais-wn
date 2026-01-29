import { BriefcaseBusiness } from "lucide-react";
import { majorPermission } from "./security";

export const majorFeatureMeta = {
  key: 'majors',
  order: 2,
  route: '/majors',
  icon: BriefcaseBusiness,
  label: {
    ADMIN: "Program Studi",
  },
  permission: majorPermission,
};