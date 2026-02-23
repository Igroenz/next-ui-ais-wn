import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AssessmentModelWithComponent } from "@/lib/types";
import AssessmentModelColumn from "./column";

interface AssessmentModelTableProps {
  data: AssessmentModelWithComponent[];
  role: string;
  onEdit: (data: Partial<AssessmentModelWithComponent>) => void;
  onDelete: (id: string | number) => void;
}

const AssessmentModelTable = ({ data, role, onEdit, onDelete }: AssessmentModelTableProps) => {
  const table = useReactTable({
    data,
    columns: AssessmentModelColumn({
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

export default AssessmentModelTable;