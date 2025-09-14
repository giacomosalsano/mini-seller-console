import { Button } from "@/components/ui/button";
import { SelectComponent } from "@/components/shared/select-component";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  ColumnFiltersState,
  SortingState,
  Table,
} from "@tanstack/react-table";
import { BrushCleaningIcon, Search } from "lucide-react";
import { useMemo } from "react";
import { LeadStatus } from "@/modules/leads/types";

interface LeadsFiltersProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  table: Table<any>;
  setColumnFilters: (value: ColumnFiltersState) => void;
  setSorting: (value: SortingState) => void;
  loading?: boolean;
}

export function LeadsFilters({
  globalFilter,
  setGlobalFilter,
  table,
  setColumnFilters,
  setSorting,
  loading = false,
}: LeadsFiltersProps) {
  const statusSelectItems = useMemo(() => {
    return [
      { value: "all", label: "All" },
      { value: LeadStatus.New, label: LeadStatus.New },
      { value: LeadStatus.Contacted, label: LeadStatus.Contacted },
      { value: LeadStatus.Qualified, label: LeadStatus.Qualified },
      { value: LeadStatus.Unqualified, label: LeadStatus.Unqualified },
    ];
  }, []);

  if (loading) {
    return (
      <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-2 lg:w-auto lg:justify-start">
        <div className="relative w-full lg:min-w-md xl:min-w-lg">
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex w-full items-center justify-center gap-2 md:justify-end">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[100px] md:hidden xl:w-auto xl:min-w-[120px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-2 lg:w-auto lg:justify-start">
      <div className="relative w-full lg:min-w-md xl:min-w-lg">
        <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
        <Input
          placeholder="Filter by id, name, company, email, source..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="pl-8"
        />
      </div>

      <div className="flex w-full items-center justify-center gap-2 md:justify-end">
        <SelectComponent
          value={(table.getColumn("status")?.getFilterValue() as string) || ""}
          onValueChange={(value) => {
            table
              .getColumn("status")
              ?.setFilterValue(value === "all" ? "" : value);
          }}
          defaultValue="all"
          placeholder="Status"
          triggerClassName="w-full lg:w-[120px]"
          items={statusSelectItems}
        />

        <Button
          variant="outline"
          onClick={() => {
            setGlobalFilter("");
            setColumnFilters([]);
            setSorting([]);
          }}
        >
          <BrushCleaningIcon />
          <span className="md:hidden xl:block">Clear Filters</span>
        </Button>
      </div>
    </div>
  );
}
