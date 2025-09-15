import type { ColumnDef } from "@tanstack/react-table";

import type { Opportunity } from "../../../modules/opportunities/types";

import { OpportunityDetails } from "./actions/opportunity-detail";
import { formatCurrency, Locale } from "@/utils/currency";
import { StageBadge } from "@/components/shared/stage-badge";
import { EditOpportunity } from "./actions/edit-opportunity";

interface CreateColumnsProps {
  onUpdateOpportunity: (opportunity: Opportunity) => void;
  loading: boolean;
}

export const createColumns = ({
  onUpdateOpportunity,
  loading,
}: CreateColumnsProps): ColumnDef<Opportunity>[] => [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "company",
    header: "Company",
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "source",
    header: "Source",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "stage",
    header: "Stage",
    enableSorting: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      return (
        <div>
          <StageBadge stage={row.original.stage} />
        </div>
      );
    },
  },
  {
    accessorKey: "amountInCents",
    header: "Amount",
    enableSorting: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      return (
        <span>
          {formatCurrency({
            valueInCents: row.original.amountInCents,
            locale: Locale.US,
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "accountName",
    header: "Account Name",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-2">
          <OpportunityDetails opportunity={row.original} />
          <EditOpportunity
            opportunity={row.original}
            onUpdateOpportunity={onUpdateOpportunity}
            loading={loading}
          />
        </div>
      );
    },
  },
];

export const columns = createColumns({
  onUpdateOpportunity: () => {},
  loading: false,
});
