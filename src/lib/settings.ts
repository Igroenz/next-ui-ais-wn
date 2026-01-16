export type RoleTypes = "ADMIN" | "LECTURER" | "ADVISOR" | "STUDENT" | "FINANCE" | "BAA" | "PRODI";

export const actions = ["view", "detail", "create", "edit", "delete"] as const;

export const session = {
  user: {
    id: "1",
    name: "Admin 1",
    avatar: "",
    roleType: "ADMIN" as RoleTypes,
    sessionUniq: "qwerty",
  }
}