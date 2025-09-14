import { Badge, badgeVariants } from "@/components/ui/badge";
import { OpportunityStage } from "@/modules/opportunities/types";
import type { VariantProps } from "class-variance-authority";

interface StageBadgeProps {
  stage: OpportunityStage;
}

const STAGE_CONFIG: Record<
  OpportunityStage,
  { label: string; variant: VariantProps<typeof badgeVariants>["variant"] }
> = {
  [OpportunityStage.New]: {
    label: "New",
    variant: "outline",
  },
  [OpportunityStage.ProposalSent]: {
    label: "Proposal Sent",
    variant: "info",
  },
  [OpportunityStage.Negotiation]: {
    label: "Negotiation",
    variant: "warning",
  },
  [OpportunityStage.Accepted]: {
    label: "Accepted",
    variant: "success",
  },
  [OpportunityStage.Declined]: {
    label: "Declined",
    variant: "destructive",
  },
};

export const StageBadge = ({ stage }: StageBadgeProps) => {
  const config = STAGE_CONFIG[stage];
  const isNew = stage === OpportunityStage.New;

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
