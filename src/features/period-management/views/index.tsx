import AdminPeriodView from "./admin-view";

export default function PeriodViewManagement({ role }: { role: string }) {
  
  if (role === "ADMIN") return <AdminPeriodView />
}