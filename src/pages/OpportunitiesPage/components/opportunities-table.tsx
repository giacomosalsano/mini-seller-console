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
import type { Opportunity } from "../../../modules/opportunities/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { OpportunitiesFilters } from "./filters";
import { useLocalStorage } from "@/modules/localStorage/hooks/useLocalStorage";
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

interface OpportunitiesTableProps<TData, TValue> {
  opportunities: Opportunity[];
  loading: boolean;
  columns: ColumnDef<TData, TValue>[];
}

export const OpportunitiesTable = <TData, TValue>({
  opportunities,
  loading,
  columns,
}: OpportunitiesTableProps<TData, TValue>) => {
  const [sorting, setSorting, isSortingLoading] = useLocalStorage<SortingState>(
    "opportunities-sorting",
    [],
  );
  const [columnFilters, setColumnFilters, areFiltersLoading] =
    useLocalStorage<ColumnFiltersState>("opportunities-filters", []);
  const [globalFilter, setGlobalFilter, isGlobalFilterLoading] =
    useLocalStorage<string>("opportunities-global-filter", "");
  const [pagination, setPagination, isPaginationLoading] =
    useLocalStorage<PaginationState>("opportunities-pagination", {
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
    data: opportunities as TData[],
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
      const opportunity = row.original as any;
      const searchValue = filterValue.toLowerCase();

      const matches =
        (opportunity.name?.toLowerCase() || "").includes(searchValue) ||
        (opportunity.id?.toString() || "").includes(searchValue) ||
        (opportunity.company?.toLowerCase() || "").includes(searchValue) ||
        (opportunity.email?.toLowerCase() || "").includes(searchValue) ||
        (opportunity.source?.toLowerCase() || "").includes(searchValue);

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
        {Array.from({ length: 9 }).map((_, cellIndex) => (
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
        of {table.getFilteredRowModel().rows.length} opportunities
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
        <OpportunitiesFilters
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          table={table}
          setColumnFilters={setColumnFilters}
          setSorting={setSorting}
          loading={isTableConfigLoading}
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
                  No opportunity found.
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
