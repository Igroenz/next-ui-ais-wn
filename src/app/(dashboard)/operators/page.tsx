import OperatorViewManagement from "@/features/operator-management/views";
import PeriodViewManagement from "@/features/period-management/views";
import { session } from "@/lib/settings";

const OperatorsPage = () => {
  const { user } = session;

  if (user.roleType === "ADMIN") return <OperatorViewManagement role={user.roleType} />
}

export default OperatorsPage;