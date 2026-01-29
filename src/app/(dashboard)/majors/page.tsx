import MajorViewManagement from "@/features/major-management/views";
import { session } from "@/lib/settings";

const MajorsPage = () => {
  const { user } = session;
  if (user.roleType === "ADMIN") return <MajorViewManagement role={user.roleType} />
};

export default MajorsPage;