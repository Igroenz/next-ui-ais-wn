import { actions } from "@/lib/settings";
import { canAccessPeriodResource } from "./security";

export const periodColumnVisibility = {
  ADMIN: {
    info: true,
    action: true,
  }
};

export const periodUI = {
  ADMIN : Object.fromEntries(actions.map((act) => [`can${act}`, canAccessPeriodResource("ADMIN", act)])),
}