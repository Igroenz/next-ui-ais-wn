import PeriodViewManagement from "@/features/period-management/views";
import { session } from "@/lib/settings";

const PeriodsPage = () => {
  const { user } = session;

  if (user.roleType === "ADMIN") return <PeriodViewManagement role={user.roleType} />
}

export default PeriodsPage;