import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const ButtonCreate = () => {
  return (
    <Button variant="default" size="sm" className="h-9 w-9 bg-blue-600 hover:bg-blue-600/80 text-sm rounded-full">
      <Plus />
    </Button>
  )
}

export default ButtonCreate;