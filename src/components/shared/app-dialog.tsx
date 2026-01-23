import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

type AppDialogTypes = {
  title: string,
  open: boolean,
  onOpenChange: (open: boolean) => void,
  children: ReactNode,
}

const AppDialog = ({
  title,
  open,
  onOpenChange,
  children,
}: AppDialogTypes) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={""}
        className="p-2 sm:p-4 w-[95vw] sm:max-w-xl md:max-w-2xl xl:max-w-4xl space-y-2 sm:space-y-4"
      >
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-black font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AppDialog;