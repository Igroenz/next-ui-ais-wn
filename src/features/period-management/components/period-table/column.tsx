"use client";

import { periodColumnVisibility } from "../../policy";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { AcademicPeriod, ACADEMICSTATE } from "@/lib/types";

interface PeriodColumnProps {
  role: string;
  onEdit: (data: Partial<AcademicPeriod>) => void;
  onDelete: (id: string) => void;
};

const PeriodColumn = ({ role, onEdit, onDelete }: PeriodColumnProps): ColumnDef<AcademicPeriod>[] => {
  const visibility = periodColumnVisibility[role as keyof typeof periodColumnVisibility];
  const columns: ColumnDef<AcademicPeriod>[] = [];

  columns.push({
    accessorKey: 'info',
    header: 'Info',
    cell: ({ row }) => (
      <div className="text-sm py-2 space-y-1.5">
        <p className="space-x-1.5">
          <span className="font-semibold">{row.original.semester_type}</span>
          <span className="text-muted-foreground">{row.original.year}/{row.original.year + 1}</span>
        </p>
        <div
          className={cn(
            "text-[10px] font-medium text-black py-1 px-2 rounded-full w-fit",
            row.original.academic_state === ACADEMICSTATE.PLANNING && "bg-yellow-500/60",
            row.original.academic_state === ACADEMICSTATE.ONGOING && "bg-green-500/60",
            row.original.academic_state === ACADEMICSTATE.CLOSE && "bg-red-500/60",
          )}
        >{row.original.academic_state}</div>
      </div>
    ),
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
};

export default PeriodColumn;