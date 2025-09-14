import { Button } from "@/components/ui/button";
import type { Lead } from "@/modules/leads/types";
import {
  AtSign,
  Building2,
  Globe,
  EyeIcon,
  FileDigit,
  IdCard,
  User,
  UserRoundCheck,
} from "lucide-react";

import { useMemo } from "react";
import { SheetComponent } from "@/components/shared/sheet-component";
import { StatusBadge } from "@/components/shared/status-badge";
import { ScoreBadge } from "@/components/shared/score-badge";

interface LeadDetailsProps {
  lead: Lead;
}

export const LeadDetails = ({ lead }: LeadDetailsProps) => {
  const leadDetailsTrigger = useMemo(() => {
    return (
      <Button variant="outline" size="sm" type="button">
        <EyeIcon className="h-4 w-4" />
      </Button>
    );
  }, []);

  const leadDetailsContent = useMemo(() => {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-row items-center justify-center gap-1">
            <div className="flex flex-row items-center gap-1">
              <IdCard className="h-4 w-4" />
              <p className="font-bold">ID:</p>
            </div>
            <p>{lead.id}</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-1">
            <div className="flex flex-row items-center gap-1">
              <User className="h-4 w-4" />
              <p className="font-bold">Name:</p>
            </div>
            <p>{lead.name}</p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-1">
          <div className="flex flex-row items-center gap-1">
            <Building2 className="h-4 w-4" />
            <p className="font-bold">Company:</p>
          </div>
          <p>{lead.company}</p>
        </div>

        <div className="flex flex-row items-center justify-center gap-1">
          <div className="flex flex-row items-center gap-1">
            <AtSign className="h-4 w-4" />
            <p className="font-bold">Email:</p>
          </div>
          <p>{lead.email}</p>
        </div>

        <div className="flex flex-row items-center justify-center gap-1">
          <div className="flex flex-row items-center gap-1">
            <Globe className="h-4 w-4" />
            <p className="font-bold">Source:</p>
          </div>
          <p>{lead.source}</p>
        </div>

        <div className="flex flex-row items-center justify-center gap-1">
          <div className="flex flex-row items-center gap-1">
            <FileDigit className="h-4 w-4" />
            <p className="hidden font-bold md:block">Score:</p>
          </div>
          <ScoreBadge score={lead.score} />
        </div>

        <div className="flex flex-row items-center justify-center gap-1">
          <div className="flex flex-row items-center gap-1">
            <UserRoundCheck className="h-4 w-4" />
            <p className="font-bold">Status:</p>
          </div>
          <StatusBadge status={lead.status} />
        </div>
      </div>
    );
  }, []);

  return (
    <SheetComponent
      trigger={leadDetailsTrigger}
      title="Lead Details"
      description="Here you can see the lead details."
      children={leadDetailsContent}
    />
  );
};
