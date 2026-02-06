import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { canAccessFeature } from "@/lib/permissions";
import { canAccessPeriodResource } from "@/features/period-management/policy";

type BaseProps = {
  role: string,
  feature: any,
};

type AdminProps = BaseProps & {
  role: "ADMIN",
  onCreate: () => void,
};

type NonAdminProps = BaseProps & {
  onCreate?: () => void,
};

type ButtonCreateProps = AdminProps | NonAdminProps;

const ButtonCreate = ({
  role,
  feature,
  onCreate,
}: ButtonCreateProps) => {

  if (!feature[role]?.cancreate) return null;

  return (
    <Button
      variant="default"
      size="sm"
      className="h-9 w-9 bg-blue-600 hover:bg-blue-600/80 text-sm rounded-full"
      onClick={onCreate}
    >
      <Plus />
    </Button>
  )
}

export default ButtonCreate;