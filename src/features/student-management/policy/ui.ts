import { actions } from "@/lib/settings";
import { canAccessStudentResource } from "./security";

export const studentColumnVisibility = {
  ADMIN: {
    info: true,
    prodi: true,
    advisor: true,
    action: true,
  },
  ADVISOR: {
    info: true,
    prodi: true,
    action: true,
  }
};

export const studentUI = {
  ADMIN: Object.fromEntries(actions.map((act) => [`can${act}`, canAccessStudentResource("ADMIN", act)])),
  ADVISOR: Object.fromEntries(actions.map((act) => [`can${act}`, canAccessStudentResource("ADVISOR", act)])),
};