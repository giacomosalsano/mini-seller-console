import type { ColumnDef } from "@tanstack/react-table";

import type { Lead } from "../../../modules/leads/types";
import { StatusBadge } from "@/components/shared/status-badge";
import { LeadDetails } from "./actions/lead-detail";
import { ScoreBadge } from "@/components/shared/score-badge";

export const createColumns = (): ColumnDef<Lead>[] => [
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
    accessorKey: "score",
    header: "Score",
    enableSorting: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      return (
        <div>
          <ScoreBadge score={row.original.score} />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      return (
        <div>
          <StatusBadge status={row.original.status} />
        </div>
      );
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
          <LeadDetails lead={row.original} />
        </div>
      );
    },
  },
];

export const columns = createColumns();
