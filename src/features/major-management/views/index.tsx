import AdminMajorView from "./admin-view";

export default function MajorViewManagement({ role }: { role: string }) {
  if (role === "ADMIN") return <AdminMajorView />
}