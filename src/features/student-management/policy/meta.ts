import { UsersRound } from "lucide-react";
import { studentPermission } from "./security";
import { featureMeta } from "@/lib/types";

export const studentFeatureMeta: featureMeta = {
  key: 'students',
  order: 5,
  route: '/students',
  icon: UsersRound,
  label: {
    ADMIN: "Mahasiswa",
  },
  permission: studentPermission,
};