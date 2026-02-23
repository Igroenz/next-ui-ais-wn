import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { AssessmentComponent, AssessmentModelWithComponent, Major } from "@/lib/types";
import { assessmentComponentColumnVisibility, assessmentModelColumnVisibility } from "../../policy";

interface AssessmentModelColumnProps {
  role: string;
  onEdit: (data: Partial<AssessmentModelWithComponent>) => void;
  onDelete: (id: string | number) => void;
};

const AssessmentModelColumn = ({ role, onEdit, onDelete }: AssessmentModelColumnProps) => {
  const visibility = assessmentModelColumnVisibility[role as keyof typeof assessmentModelColumnVisibility];
  const columns: ColumnDef<AssessmentModelWithComponent>[] = [];

  columns.push({
    accessorKey: 'info',
    header: 'Info',
    cell: ({ row }) => (
      <div className="text-sm py-2 space-y-1.5">
        <p className="font-medium text-gray-950">{row.original.name}</p>
      </div>
    )
  });

  if (visibility.komponen) {
    columns.push({
      accessorKey: 'komponen',
      header: 'Komponen',
      cell: ({ row }) => (
        <div className="flex gap-2 flex-wrap">
          {row.original.assessmentModelComponent?.sort((a, b) => a.sort_order - b.sort_order).map((item) => (
            <div key={item.id} className="p-2 text-xs font-medium text-gray-900 rounded-full odd:bg-green-200 even:bg-yellow-200">
              {item.assessmentComponent?.acronym} - {item.percentage}%
            </div>
          ))}
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

export default AssessmentModelColumn;