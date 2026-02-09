import { UsersRound } from "lucide-react";
import { studentPermission } from "./security";

export const studentFeatureMeta = {
  key: 'students',
  order: 5,
  route: '/students',
  icon: UsersRound,
  label: {
    ADMIN: "Mahasiswa",
  },
  permission: studentPermission,
};