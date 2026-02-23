import AdminAssessmentModelView from "@/features/course-management/views/assessment/admin-view";
import { session } from "@/lib/settings";

const AssessmentPage = () => {
  const { user } = session;
  if (user.roleType === "ADMIN") return <AdminAssessmentModelView role={user.roleType} />
};

export default AssessmentPage;