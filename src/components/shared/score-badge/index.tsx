import { Badge, badgeVariants } from "@/components/ui/badge";
import type { VariantProps } from "class-variance-authority";

interface ScoreBadgeProps {
  score: number;
}

const getScoreVariant = (
  score: number,
): VariantProps<typeof badgeVariants>["variant"] => {
  if (score <= 40) return "destructive";
  if (score <= 69) return "warning";
  if (score <= 89) return "info";
  return "success";
};

export const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const variant = getScoreVariant(score);

  return (
    <Badge className="min-w-[25px] rounded-full" variant={variant}>
      {score}
    </Badge>
  );
};
