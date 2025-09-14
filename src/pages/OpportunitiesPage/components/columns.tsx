import type { ColumnDef } from "@tanstack/react-table";

import type { Opportunity } from "../../../modules/opportunities/types";

import { OpportunityDetails } from "./actions/opportunity-detail";

export const createColumns = (): ColumnDef<Opportunity>[] => [
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
  },
  {
    accessorKey: "amount",
    header: "Amount",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
        </div>
      );
    },
  },
];

export const columns = createColumns();
