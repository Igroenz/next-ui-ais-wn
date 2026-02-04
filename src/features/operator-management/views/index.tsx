import AdminOperatorView from "./admin-view";

export default function OperatorViewManagement({ role }: { role: string }) {
  if (role === "ADMIN") return <AdminOperatorView />
}