import { ClockFading } from "lucide-react";
import { periodPermissions } from "./security";

export const periodFeatureMeta = {
  key: 'periods',
  order: 1,
  route: '/periods',
  icon: ClockFading,
  label: {
    ADMIN: "Periode Akademik",
  },
  permission: periodPermissions,
};