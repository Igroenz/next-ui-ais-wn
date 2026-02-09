import { StudentWithUserAndMajor } from "@/lib/types";
import { studentColumnVisibility } from "../../policy";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash } from "lucide-react";

interface StudentColumnProps {
  role: string;
  onEdit: (data: Partial<StudentWithUserAndMajor>) => void;
  onDelete: (id: string) => void;
};

const StudentColumn = ({ role, onEdit, onDelete }: StudentColumnProps) => {
  const visibility = studentColumnVisibility[role as keyof typeof studentColumnVisibility];
  const columns: ColumnDef<StudentWithUserAndMajor>[] = [];

  if (visibility.info) {
    columns.push({
      accessorKey: 'info',
      header: 'Info',
      cell: ({ row }) => (
        <div className="text-sm py-2 flex flex-row gap-1 items-center">
          <Avatar size="lg">
            <AvatarImage
              src={"https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>{row.original.name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5">
            <p className="font-medium text-gray-950">{row.original.name}</p>
            <p className="text-xs text-gray-600">{row.original.nim}</p>
          </div>
        </div>
      )
    })
  }

  // if (visibility.peran) {
  //   columns.push({
  //     accessorKey: 'peran',
  //     header: 'Peran',
  //     cell: ({ row }) => (
  //       <div className="text-sm">
  //         <p className="text-gray-950">{row.original.role}</p>
  //       </div>
  //     )
  //   })
  // }

  if (visibility.prodi) {
    columns.push({
      accessorKey: 'prodi',
      header: 'Prodi',
      cell: ({ row }) => (
        <div className="text-sm">
          <p className="text-gray-950">{row.original.major?.degree}-{row.original.major?.name}</p>
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

export default StudentColumn;