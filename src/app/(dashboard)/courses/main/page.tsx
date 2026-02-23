import AdminCourseView from "@/features/course-management/views/course/admin-view";
import { session } from "@/lib/settings";

const CoursePage = () => {
  const { user } = session;
  if (user.roleType === "ADMIN") return <AdminCourseView role={user.roleType} />
};

export default CoursePage;