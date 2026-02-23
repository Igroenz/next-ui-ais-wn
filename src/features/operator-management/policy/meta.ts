import { UserCog } from "lucide-react";
import { operatorPermission } from "./security";
import { featureMeta } from "@/lib/types";

export const operatorFeatureMeta: featureMeta = {
  key: 'operators',
  order: 3,
  route: '/operators',
  icon: UserCog,
  label: {
    ADMIN: "Operator",
  },
  permission: operatorPermission,
}