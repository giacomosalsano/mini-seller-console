import { Badge, badgeVariants } from "@/components/ui/badge";
import type { VariantProps } from "class-variance-authority";
import { Star } from "lucide-react";

interface ScoreBadgeProps {
  score: number;
}

type BadgeVariant =
  | VariantProps<typeof badgeVariants>["variant"]
  | "diamond-lead";

const getScoreVariant = (score: number): BadgeVariant => {
  if (score === 100) return "diamond-lead";
  if (score >= 90) return "success";
  if (score >= 70) return "info";
  if (score >= 41) return "warning";
  return "destructive";
};

export const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const variant = getScoreVariant(score);

  const isDiamondLead = variant === "diamond-lead";

  return (
    <Badge
      className={`min-w-[30px] rounded-full ${
        isDiamondLead ? "bg-[var(--diamond-lead)] text-white" : ""
      }`}
      variant={!isDiamondLead ? variant : undefined}
    >
      {isDiamondLead ? <Star fill="white" /> : null} {score}
    </Badge>
  );
};
