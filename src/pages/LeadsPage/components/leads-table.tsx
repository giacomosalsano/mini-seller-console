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
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import type { Lead } from "../../../modules/leads/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LeadsFilters } from "./filters";
import { useLocalStorage } from "@/modules/localStorage/hooks/useLocalStorage";
import { AddLeadAction } from "./actions/add-lead";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useMemo } from "react";

interface LeadsTableProps<TData, TValue> {
  leads: Lead[];
  loading: boolean;
  columns: ColumnDef<TData, TValue>[];
  onAddLead: (lead: Omit<Lead, "id">) => void;
}

export const LeadsTable = <TData, TValue>({
  leads,
  loading,
  columns,
  onAddLead,
}: LeadsTableProps<TData, TValue>) => {
  const [sorting, setSorting, isSortingLoading] = useLocalStorage<SortingState>(
    "leads-sorting",
    [],
  );
  const [columnFilters, setColumnFilters, areFiltersLoading] =
    useLocalStorage<ColumnFiltersState>("leads-filters", []);
  const [globalFilter, setGlobalFilter, isGlobalFilterLoading] =
    useLocalStorage<string>("leads-global-filter", "");
  const [pagination, setPagination, isPaginationLoading] =
    useLocalStorage<PaginationState>("leads-pagination", {
      pageIndex: 0,
      pageSize: 20,
    });

  const isTableConfigLoading =
    loading ||
    isSortingLoading ||
    areFiltersLoading ||
    isGlobalFilterLoading ||
    isPaginationLoading;

  const table = useReactTable({
    data: leads as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
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
      pagination,
    },
  });

  const renderSkeletonRows = () => {
    return Array.from({ length: 15 }).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        {Array.from({ length: 8 }).map((_, cellIndex) => (
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

  const footerContent = useMemo(() => {
    return (
      <>
        Showing{" "}
        {table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize +
          1}{" "}
        to{" "}
        {Math.min(
          (table.getState().pagination.pageIndex + 1) *
            table.getState().pagination.pageSize,
          table.getFilteredRowModel().rows.length,
        )}{" "}
        of {table.getFilteredRowModel().rows.length} leads
      </>
    );
  }, [
    table.getState().pagination.pageIndex,
    table.getState().pagination.pageSize,
    table.getFilteredRowModel().rows.length,
  ]);

  return (
    <div className="mx-auto w-full items-center justify-center space-y-4">
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-2 lg:justify-between">
        <LeadsFilters
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          table={table}
          setColumnFilters={setColumnFilters}
          setSorting={setSorting}
          loading={isTableConfigLoading}
        />
        <AddLeadAction onAddLead={onAddLead} loading={isTableConfigLoading} />
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
            {isTableConfigLoading ? (
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

      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <div>
          {isTableConfigLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            footerContent
          )}
        </div>
      </div>

      {!isTableConfigLoading && table.getPageCount() > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                className={
                  !table.getCanPreviousPage()
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
              (pageIndex) => {
                const isCurrentPage =
                  pageIndex === table.getState().pagination.pageIndex;
                const isNearCurrentPage =
                  Math.abs(pageIndex - table.getState().pagination.pageIndex) <=
                  1;
                const isFirstPage = pageIndex === 0;
                const isLastPage = pageIndex === table.getPageCount() - 1;

                if (!isNearCurrentPage && !isFirstPage && !isLastPage) {
                  if (
                    pageIndex === 1 ||
                    pageIndex === table.getPageCount() - 2
                  ) {
                    return (
                      <PaginationItem key={pageIndex}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                }

                return (
                  <PaginationItem key={pageIndex}>
                    <PaginationLink
                      onClick={() => table.setPageIndex(pageIndex)}
                      isActive={isCurrentPage}
                      className="cursor-pointer"
                    >
                      {pageIndex + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              },
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                className={
                  !table.getCanNextPage()
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
