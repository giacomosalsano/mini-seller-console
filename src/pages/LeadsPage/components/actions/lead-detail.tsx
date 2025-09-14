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
import { useNavigate, useLocation } from "react-router-dom";
import { StatusBadge } from "@/components/shared/status-badge";
import { ScoreBadge } from "@/components/shared/score-badge";
import { SheetComponent } from "@/components/shared/sheet-component";

interface LeadDetailsProps {
  lead: Lead;
}

export const LeadDetails = ({ lead }: LeadDetailsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDetailsRoute = location.pathname === `/leads/details/${lead.id}`;
  const isOpen = isDetailsRoute;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate("/leads");
    }
  };

  const leadDetailsTrigger = useMemo(() => {
    return (
      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={() => navigate(`/leads/details/${lead.id}`)}
      >
        <EyeIcon className="h-4 w-4" />
      </Button>
    );
  }, [lead.id, navigate]);

  const leadDetailsContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-6 p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <IdCard className="text-muted-foreground h-4 w-4" />{" "}
            <p>
              <span className="font-bold">ID:</span> {lead.id}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <User className="text-muted-foreground h-4 w-4" />{" "}
            <p>
              <span className="font-bold">Name:</span> {lead.name}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex flex-row items-center gap-1">
            <Building2 className="h-4 w-4" />
            <p className="font-bold">Company:</p>
          </div>
          <p>{lead.company}</p>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex flex-row items-center gap-1">
            <AtSign className="h-4 w-4" />
            <p className="font-bold">Email:</p>
          </div>
          <p>{lead.email}</p>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex flex-row items-center gap-1">
            <Globe className="h-4 w-4" />
            <p className="font-bold">Source:</p>
          </div>
          <p>{lead.source}</p>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex flex-row items-center gap-1">
            <FileDigit className="h-4 w-4" />
            <p className="hidden font-bold md:block">Score:</p>
          </div>
          <ScoreBadge score={lead.score} />
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex flex-row items-center gap-1">
            <UserRoundCheck className="h-4 w-4" />
            <p className="font-bold">Status:</p>
          </div>
          <StatusBadge status={lead.status} />
        </div>
      </div>
    );
  }, [lead]);

  return (
    <SheetComponent
      open={isOpen}
      onOpenChange={handleOpenChange}
      trigger={leadDetailsTrigger}
      title="Lead Details"
      description="Here you can see the lead details."
      children={leadDetailsContent}
    />
  );
};
