import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { Course } from "@/lib/types";
import { courseColumnVisibility } from "../../policy";

interface CourseColumnProps {
  role: string;
  onEdit: (data: Partial<Course>) => void;
  onDelete: (id: string | number) => void;
};

const CourseColumn = ({ role, onEdit, onDelete }: CourseColumnProps) => {
  const visibility = courseColumnVisibility[role as keyof typeof courseColumnVisibility];
  const columns: ColumnDef<Course>[] = [];

  columns.push({
    accessorKey: 'info',
    header: 'Info',
    cell: ({ row }) => (
      <div className="text-sm py-2 space-y-1.5">
        <p className="font-medium text-gray-950">{row.original.name}</p>
        <p className="text-xs text-gray-600 font-medium">{row.original.code}</p>
      </div>
    )
  });

  if (visibility.prodi) {
    columns.push({
      accessorKey: 'prodi',
      header: 'Prodi',
      cell: ({ row }) => (
        <div className="text-sm py-2 space-y-1.5">
          <p className="font-normal text-gray-950">{row.original.major?.name}</p>
        </div>
      )
    });
  }
  if (visibility.tipe) {
    columns.push({
      accessorKey: 'tipe',
      header: 'Tipe',
      cell: ({ row }) => (
        <div className="text-sm py-2 space-y-1.5">
          <p className="font-normal text-gray-950">{row.original.courseType?.name}</p>
        </div>
      )
    });
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

export default CourseColumn;