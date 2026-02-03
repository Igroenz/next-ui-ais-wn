import { Operator } from "@/lib/types";
import { operatorColumnVisibility } from "../../policy";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash } from "lucide-react";

interface OperatorColumnProps {
  role: string,
  onEdit: (data: Partial<Operator>) => void;
  onDelete: (id: string) => void;
}

const OperatorColumn = ({ role, onEdit, onDelete }: OperatorColumnProps) => {

  const visibility = operatorColumnVisibility[role as keyof typeof operatorColumnVisibility];
  const columns: ColumnDef<Operator>[] = [];

  if (visibility.info) {
    columns.push({
      accessorKey: 'info',
      header: 'Info',
      cell: ({ row }) => (
        <div className="text-sm py-2 space-y-1.5">
          <p className="font-medium text-gray-950">{row.original.name}</p>
          <p className="text-xs text-gray-600">{row.original.employee_id}</p>
        </div>
      )
    })
  }

  if (visibility.peran) {
    columns.push({
      accessorKey: 'peran',
      header: 'Peran',
      cell: ({ row }) => (
        <div className="text-sm">
          <p className="text-gray-950">{row.original.role}</p>
        </div>
      )
    })
  }

  if (visibility.departement) {
    columns.push({
      accessorKey: 'departement',
      header: 'Departement',
      cell: ({ row }) => (
        <div className="text-sm">
          <p className="text-gray-950">{row.original.department}</p>
        </div>
      )
    })
  }

  if (visibility.action) {
    columns.push({
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon-sm">
                <MoreVertical className="w-2 h-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-24" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button variant="ghost" size="sm" onClick={() => onEdit(row.original)}>
                    <Edit />
                    Edit
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant="ghost" size="sm" className="text-red-700" onClick={() => onDelete(row.original.id)}>
                    <Trash className="text-red-600" />
                    Hapus
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    })
  }

  return columns;
}

export default OperatorColumn;