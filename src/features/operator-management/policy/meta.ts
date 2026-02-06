import { UserCog } from "lucide-react";
import { operatorPermission } from "./security";

export const operatorFeatureMeta = {
  key: 'operators',
  order: 3,
  route: '/operators',
  icon: UserCog,
  label: {
    ADMIN: "Operator",
  },
  permission: operatorPermission,
}