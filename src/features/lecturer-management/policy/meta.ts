import { Users } from "lucide-react";
import { lecturerPermission } from "./security";
import { featureMeta } from "@/lib/types";

export const lecturerFeatureMeta: featureMeta = {
  key: 'lecturers',
  order: 4,
  route: '/lecturers',
  icon: Users,
  label: {
    ADMIN: "Dosen",
  },
  permission: lecturerPermission,
};