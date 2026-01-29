import { actions } from "@/lib/settings";
import { canAccessMajorResource } from "./security";

export const majorColumnVisibility = {
  ADMIN: {
    info: true,
    action: true,
  }
};

export const majorUI = {
  ADMIN : Object.fromEntries(actions.map((act) => [`can${act}`, canAccessMajorResource("ADMIN", act)])),
}