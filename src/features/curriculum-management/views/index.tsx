import AdminCurriculumView from "./admin-view";
import CurriculumDetailView from "./detail-view";

export default function CurriculumViewManagement({ role, id, detail = false }: { role: string, id?: string | number, detail: boolean }) {

  if (role === "ADMIN" && !detail) return <AdminCurriculumView role={role} />

  if (detail) return <CurriculumDetailView role={role} id={id!} />;
}