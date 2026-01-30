import { ColumnDef } from "@tanstack/react-table";
import { majorColumnVisibility } from "../../policy";
import { Major } from "../../types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash } from "lucide-react";

interface MajorColumnProps {
  role: string;
  onEdit: (data: Partial<Major>) => void;
  onDelete: (id: string) => void;
};

const MajorColumn = ({ role, onEdit, onDelete }: MajorColumnProps) => {
  const visibility = majorColumnVisibility[role as keyof typeof majorColumnVisibility];
  const columns: ColumnDef<Major>[] = [];

  columns.push({
    accessorKey: 'info',
    header: 'Info',
    cell: ({ row }) => (
      <div className="text-sm py-2 space-y-1.5">
        <p className="font-medium text-gray-950">{row.original.degree}-{row.original.name}</p>
        <p className="text-xs text-gray-600">Kode: <span className="font-bold">{row.original.code}</span></p>
      </div>
    )
  });

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

export default MajorColumn;