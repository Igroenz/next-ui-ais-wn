import { Curriculum } from "@/lib/types";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import CurriculumColumn from "./column";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CurriculumTableProps {
  data: Curriculum[];
  role: string;
  onEdit: (data: Partial<Curriculum>) => void;
  onDelete: (id: string | number) => void;
}

const CurriculumTable = ({ data, role, onEdit, onDelete }: CurriculumTableProps) => {
  const table = useReactTable({
    data,
    columns: CurriculumColumn({
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

export default CurriculumTable;