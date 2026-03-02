import { CurriculumDetail } from "@/lib/types";
import { curriculumDetailColumnVisibility, curriculumDetailUI } from "../../policy";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash } from "lucide-react";

interface CurriculumDetailColumnProps {
  role: string;
  onEdit: (data: Partial<CurriculumDetail>) => void;
  onDelete: (id: string | number) => void;
};

const CurriculumDetailColumn = ({ role, onEdit, onDelete }: CurriculumDetailColumnProps) => {
  const visibility = curriculumDetailColumnVisibility[role as keyof typeof curriculumDetailColumnVisibility];
  const columns: ColumnDef<CurriculumDetail>[] = [];

  columns.push({
    accessorKey: 'info',
    header: 'Info',
    cell: ({ row }) => (
      <div className="text-sm py-2 space-y-1.5">
        <p className="font-medium text-gray-950">{row.original.course?.name}</p>
        <p className="text-xs text-gray-600 font-medium">{row.original.course?.code}</p>
      </div>
    )
  });

  if (visibility.semester) {
    columns.push({
      accessorKey: 'semester',
      header: 'Semester',
      cell: ({ row }) => (
        <div className="text-sm py-2 space-y-1.5">
          <p className="font-normal text-gray-950">{row.original.semester}</p>
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
                {curriculumDetailUI[role as keyof typeof curriculumDetailUI]?.canedit && (
                  <DropdownMenuItem>
                    <Button variant="ghost" size="sm" onClick={() => onEdit(row.original)}>
                      <Edit />
                      Edit
                    </Button>
                  </DropdownMenuItem>
                )}
                {curriculumDetailUI[role as keyof typeof curriculumDetailUI]?.candelete && (
                  <DropdownMenuItem>
                    <Button variant="ghost" size="sm" className="text-red-700" onClick={() => onDelete(row.original.id)}>
                      <Trash className="text-red-600" />
                      Hapus
                    </Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    })
  }


  return columns;
}

export default CurriculumDetailColumn;