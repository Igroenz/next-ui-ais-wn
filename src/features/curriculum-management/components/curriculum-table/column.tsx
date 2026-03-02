import { Curriculum } from "@/lib/types";
import { curriculumColumnVisibility, curriculumUI } from "../../policy";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreVertical, Trash } from "lucide-react";
import { canAccessCurriculumResource } from "../../policy/security";
import Link from "next/link";

interface CurriculumColumnProps {
  role: string;
  onEdit: (data: Partial<Curriculum>) => void;
  onDelete: (id: string | number) => void;
};

const CurriculumColumn = ({ role, onEdit, onDelete }: CurriculumColumnProps) => {
  const visibility = curriculumColumnVisibility[role as keyof typeof curriculumColumnVisibility];
  const columns: ColumnDef<Curriculum>[] = [];

  columns.push({
    accessorKey: 'info',
    header: 'Info',
    cell: ({ row }) => (
      <div className="text-sm py-2 space-y-1.5">
        <p className="font-medium text-gray-950">{row.original.name}{row.original.id}</p>
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
                {curriculumUI[role as keyof typeof curriculumUI]?.candetail && (
                  <DropdownMenuItem>
                    <Link href={`/curriculums/${row.original.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye />
                        Detail
                      </Button>
                    </Link>
                  </DropdownMenuItem>
                )}
                {curriculumUI[role as keyof typeof curriculumUI]?.canedit && (
                  <DropdownMenuItem>
                    <Button variant="ghost" size="sm" onClick={() => onEdit(row.original)}>
                      <Edit />
                      Edit
                    </Button>
                  </DropdownMenuItem>
                )}
                {curriculumUI[role as keyof typeof curriculumUI]?.candelete && (
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

export default CurriculumColumn;