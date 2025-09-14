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
import { OpportunityStage } from "@/modules/opportunities/types";
import { useLocalStorage } from "@/modules/localStorage/hooks/useLocalStorage";

interface OpportunitiesFiltersProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  table: Table<any>;
  setColumnFilters: (value: ColumnFiltersState) => void;
  setSorting: (value: SortingState) => void;
  loading?: boolean;
}

export function OpportunitiesFilters({
  globalFilter,
  setGlobalFilter,
  table,
  setColumnFilters,
  setSorting,
  loading = false,
}: OpportunitiesFiltersProps) {
  const stageSelectItems = useMemo(() => {
    return [
      { value: "all", label: "All" },
      { value: OpportunityStage.New, label: OpportunityStage.New },
      {
        value: OpportunityStage.ProposalSent,
        label: OpportunityStage.ProposalSent,
      },

      {
        value: OpportunityStage.Negotiation,
        label: OpportunityStage.Negotiation,
      },
      { value: OpportunityStage.Accepted, label: OpportunityStage.Accepted },
      { value: OpportunityStage.Declined, label: OpportunityStage.Declined },
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
          value={(table.getColumn("stage")?.getFilterValue() as string) || ""}
          onValueChange={(value) => {
            table
              .getColumn("stage")
              ?.setFilterValue(value === "all" ? "" : value);
          }}
          defaultValue="all"
          placeholder="Stage"
          triggerClassName="w-full lg:w-[120px]"
          items={stageSelectItems}
        />

        <Button
          variant="outline"
          onClick={() => {
            setGlobalFilter("");
            setColumnFilters([]);
            setSorting([]);
            useLocalStorage("opportunities-global-filter", "");
            useLocalStorage("opportunities-filters", []);
            useLocalStorage("opportunities-sorting", []);
          }}
        >
          <BrushCleaningIcon />
          <span className="md:hidden xl:block">Clear Filters</span>
        </Button>
      </div>
    </div>
  );
}
