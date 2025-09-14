import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import type { Lead } from "../../../modules/leads/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Filters } from "./filters";

interface LeadsTableProps<TData, TValue> {
  leads: Lead[];
  loading: boolean;
  columns: ColumnDef<TData, TValue>[];
}

export const LeadsTable = <TData, TValue>({
  leads,
  loading,
  columns,
}: LeadsTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: leads as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const lead = row.original as any;
      const searchValue = filterValue.toLowerCase();

      const matches =
        (lead.name?.toLowerCase() || "").includes(searchValue) ||
        (lead.id?.toString() || "").includes(searchValue) ||
        (lead.company?.toLowerCase() || "").includes(searchValue) ||
        (lead.email?.toLowerCase() || "").includes(searchValue) ||
        (lead.source?.toLowerCase() || "").includes(searchValue);

      return matches;
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const renderSkeletonRows = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        {Array.from({ length: 5 }).map((_, cellIndex) => (
          <TableCell
            key={`skeleton-cell-${index}-${cellIndex}`}
            className="text-center"
          >
            <Skeleton className="mx-auto h-4 w-20" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  if (loading) {
    return renderSkeletonRows();
  }

  return (
    <div className="mx-auto w-full items-center justify-center space-y-4">
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-2 lg:justify-between">
        <Filters
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          table={table}
          setColumnFilters={setColumnFilters}
          setSorting={setSorting}
          loading={loading}
        />
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center justify-center ${
                            header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : ""
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getCanSort() && (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              renderSkeletonRows()
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    index % 2 === 0 && "bg-muted/50",
                    "hover:bg-hover hover:animate-pulse",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No lead found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-muted-foreground flex items-center justify-end text-sm">
        <div>
          {loading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <>
              Showing {table.getFilteredRowModel().rows.length} of{" "}
              {table.getRowModel().rows.length} leads
            </>
          )}
        </div>
      </div>
    </div>
  );
};
