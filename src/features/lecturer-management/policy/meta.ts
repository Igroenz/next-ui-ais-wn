import { Users } from "lucide-react";
import { lecturerPermission } from "./security";

export const lecturerFeatureMeta = {
  key: 'lecturers',
  order: 4,
  route: '/lecturers',
  icon: Users,
  label: {
    ADMIN: "Dosen",
  },
  permission: lecturerPermission,
};