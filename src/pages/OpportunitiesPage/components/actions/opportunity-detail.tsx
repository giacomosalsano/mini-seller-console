import { Button } from "@/components/ui/button";
import type { Opportunity } from "@/modules/opportunities/types";
import {
  AtSign,
  Building2,
  Globe,
  EyeIcon,
  IdCard,
  User,
  Locate,
  DollarSign,
  ALargeSmall,
} from "lucide-react";

import { useMemo } from "react";
import { SheetComponent } from "@/components/shared/sheet-component";
import { formatCurrency, Locale } from "@/utils/currency";
import { StageBadge } from "@/components/shared/stage-badge";

interface OpportunityDetailsProps {
  opportunity: Opportunity;
}

export const OpportunityDetails = ({
  opportunity,
}: OpportunityDetailsProps) => {
  const opportunityDetailsTrigger = useMemo(() => {
    return (
      <Button variant="outline" size="sm" type="button">
        <EyeIcon className="h-4 w-4" />
      </Button>
    );
  }, []);

  const opportunityDetailsContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-6 p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <IdCard className="text-muted-foreground h-4 w-4" />{" "}
            <p>
              <span className="font-bold">ID:</span> {opportunity.id}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <User className="text-muted-foreground h-4 w-4" />{" "}
            <p>
              <span className="font-bold">Name:</span> {opportunity.name}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex flex-row items-center gap-1">
            <Building2 className="h-4 w-4" />
            <p className="font-bold">Company:</p>
          </div>
          <p>{opportunity.company}</p>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex flex-row items-center gap-1">
            <AtSign className="h-4 w-4" />
            <p className="font-bold">Email:</p>
          </div>
          <p>{opportunity.email}</p>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex flex-row items-center gap-1">
            <Globe className="h-4 w-4" />
            <p className="font-bold">Source:</p>
          </div>
          <p>{opportunity.source}</p>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex flex-row items-center gap-1">
            <Locate className="h-4 w-4" />
            <p className="hidden font-bold md:block">Stage:</p>
          </div>
          <StageBadge stage={opportunity.stage} />
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex flex-row items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <p className="font-bold">Amount:</p>
          </div>
          <p>
            {formatCurrency({
              valueInCents: opportunity.amountInCents,
              locale: Locale.US,
            })}
          </p>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex flex-row items-center gap-1">
            <ALargeSmall className="h-4 w-4" />
            <p className="hidden font-bold md:block">Account Name:</p>
          </div>
          {opportunity.accountName}
        </div>
      </div>
    );
  }, []);

  return (
    <SheetComponent
      trigger={opportunityDetailsTrigger}
      title="Opportunity Details"
      description="Here you can see the opportunity details."
      children={opportunityDetailsContent}
    />
  );
};
