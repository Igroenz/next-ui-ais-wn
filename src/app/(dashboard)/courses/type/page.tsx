import AdminCourseTypeView from "@/features/course-management/views/type/admin-view";
import { session } from "@/lib/settings";

const CourseTypePage = () => {
  const { user } = session;
  if (user.roleType === "ADMIN") return <AdminCourseTypeView role={user.roleType} />
};

export default CourseTypePage;