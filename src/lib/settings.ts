export type RoleTypes = "ADMIN" | "LECTURER" | "ADVISOR" | "STUDENT" | "FINANCE" | "BAA" | "PRODI";

export const actions = ["view", "detail", "create", "edit", "profile", "delete"] as const;
export const degree = ["D3", "S1", "S2", "S3"] as const;
export const roles = ["ADMIN", "LECTURER", "ADVISOR", "STUDENT", "FINANCE", "BAA", "PRODI"] as const;
export const gender = ["PRIA", "WANITA"] as const;

export const semesterType = ["GANJIL", "GANJIL_PENDEK", "GENAP", "GENAP_PENDEK"];
export const academicState = ["PLANNING", "ONGOING", "CLOSE"];
export const registerStatus = ["NEW", "CREDIT_TRANSFER", "RENIM", "CREDIT_ACQUISITION"];

export const session = {
  user: {
    id: "1",
    name: "Admin 1",
    avatar: "",
    roleType: "ADMIN" as RoleTypes,
    sessionUniq: "qwerty",
  }
}