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
    variant: "default",
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

  return (
    <Badge className={`min-w-[100px] rounded-full`} variant={config.variant}>
      {config.label}
    </Badge>
  );
};
