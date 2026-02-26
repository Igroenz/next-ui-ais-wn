import CurriculumViewManagement from "@/features/curriculum-management/views";
import { session } from "@/lib/settings";

const CurriculumsPage = () => {
  const { user } = session;

  if (user.roleType === "ADMIN") return <CurriculumViewManagement role={user.roleType} detail={false} />
}

export default CurriculumsPage;