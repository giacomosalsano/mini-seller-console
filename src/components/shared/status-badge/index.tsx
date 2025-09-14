import { Badge, badgeVariants } from "@/components/ui/badge";
import { LeadStatus } from "@/modules/leads/types";
import type { VariantProps } from "class-variance-authority";

interface StatusBadgeProps {
  status: LeadStatus;
}

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; variant: VariantProps<typeof badgeVariants>["variant"] }
> = {
  [LeadStatus.New]: {
    label: "New",
    variant: "outline",
  },
  [LeadStatus.Contacted]: {
    label: "Contacted",
    variant: "info",
  },
  [LeadStatus.Qualified]: {
    label: "Qualified",
    variant: "success",
  },
  [LeadStatus.Unqualified]: {
    label: "Unqualified",
    variant: "destructive",
  },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];
  const isNew = status === LeadStatus.New;

  return (
    <div className="relative inline-block">
      <Badge
        className={`min-w-[70px] rounded-full ${isNew ? "text-success border-success" : ""}`}
        variant={config.variant}
      >
        {config.label}
      </Badge>
    </div>
  );
};
