import { actions } from "@/lib/settings";
import { canAccessOperatorResource } from "./security";

export const operatorColumnVisibility = {
  ADMIN: {
    info: true,
    departement: true,
    peran: true,
    action: true,
  }
};

export const operatorUI = {
  ADMIN: Object.fromEntries(actions.map((act) => [`can${act}`, canAccessOperatorResource("ADMIN", act)])),
};