import AdminAssessCompView from "@/features/course-management/views/comp/admin-view";
import { session } from "@/lib/settings";

const AssessmentComponentPage = () => {
  const { user } = session;
  if (user.roleType === "ADMIN") return <AdminAssessCompView role={user.roleType} />
};

export default AssessmentComponentPage;