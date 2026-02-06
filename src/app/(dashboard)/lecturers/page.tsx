import AdminLecturerView from "@/features/lecturer-management/views/admin-view";
import OperatorViewManagement from "@/features/operator-management/views";
import PeriodViewManagement from "@/features/period-management/views";
import { session } from "@/lib/settings";

const LecturerPage = () => {
  const { user } = session;

  // return (
  //   <div>LEcturer PAge</div>
  // )

  if (user.roleType === "ADMIN") return <AdminLecturerView role={user.roleType} />
}

export default LecturerPage;