import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AssessmentComponent, Course } from "@/lib/types";
import AssessComponentColumn from "./column";
import CourseColumn from "./column";

interface CourseTableProps {
  data: Course[];
  role: string;
  onEdit: (data: Partial<Course>) => void;
  onDelete: (id: string | number) => void;
}

const CourseTable = ({ data, role, onEdit, onDelete }: CourseTableProps) => {
  const table = useReactTable({
    data,
    columns: CourseColumn({
      role: role,
      onEdit: onEdit,
      onDelete: onDelete,
    }),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    }
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {/* TableBody */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>
                  No. Result...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CourseTable;