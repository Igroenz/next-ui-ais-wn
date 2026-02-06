import { actions } from "@/lib/settings";
import { canAccessLecturerResource } from "./security";

export const lecturerColumnVisibility = {
  ADMIN: {
    info: true,
    prodi: true,
    peran: true,
    action: true,
  }
};

export const lecturerUI = {
  ADMIN: Object.fromEntries(actions.map((act) => [`can${act}`, canAccessLecturerResource("ADMIN", act)])),
};