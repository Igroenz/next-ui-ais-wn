import AdminLecturerView from "@/features/lecturer-management/views/admin-view";
import OperatorViewManagement from "@/features/operator-management/views";
import PeriodViewManagement from "@/features/period-management/views";
import AdminStudentView from "@/features/student-management/views/admin-view";
import { session } from "@/lib/settings";

const LecturerPage = () => {
  const { user } = session;

  // return (
  //   <div>Student Page</div>
  // )

  if (user.roleType === "ADMIN") return <AdminStudentView role={user.roleType} />
}

export default LecturerPage;