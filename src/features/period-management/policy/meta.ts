import { ClockFading } from "lucide-react";
import { periodPermissions } from "./security";
import { featureMeta } from "@/lib/types";

export const periodFeatureMeta: featureMeta = {
  key: 'periods',
  order: 1,
  route: '/periods',
  icon: ClockFading,
  label: {
    ADMIN: "Periode Akademik",
  },
  permission: periodPermissions,
};