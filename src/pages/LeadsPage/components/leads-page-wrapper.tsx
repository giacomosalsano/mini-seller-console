import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { LeadsPage } from "../index";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserX } from "lucide-react";
import { SheetComponent } from "@/components/shared/sheet-component";
import type { Lead } from "@/modules/leads/types";
import type { Opportunity } from "@/modules/opportunities/types";

interface LeadsPageWrapperProps {
  leads: Lead[];
  loading: boolean;
  handleGetLeads: (props: { props: {} }) => void;
  handleUpdateLead: (props: { props: Lead }) => void;
  handleRemoveLead: (props: { props: { id: string } }) => void;
  handleAddOpportunity: (props: { props: Opportunity }) => void;
}

export const LeadsPageWrapper = ({
  leads,
  loading,
  handleGetLeads,
  handleUpdateLead,
  handleRemoveLead,
  handleAddOpportunity,
}: LeadsPageWrapperProps) => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showNotFoundSheet, setShowNotFoundSheet] = useState(false);

  const isLeadRoute =
    location.pathname.startsWith("/leads/edit/") ||
    location.pathname.startsWith("/leads/details/");

  useEffect(() => {
    if (isLeadRoute && !loading && leads.length > 0 && id) {
      const currentLead = leads.find((lead) => lead.id === id);

      if (!currentLead) {
        setShowNotFoundSheet(true);
      } else {
        setShowNotFoundSheet(false);
      }
    }
  }, [isLeadRoute, loading, leads, id]);

  const handleCloseNotFoundSheet = () => {
    setShowNotFoundSheet(false);
    navigate("/leads");
  };

  const leadDetailsContent = useMemo(() => {
    return (
      <div className="flex flex-col items-center gap-6 py-6">
        <UserX className="text-destructive h-10 w-10" />
        <div className="text-center">
          <p className="text-muted-foreground">
            The lead with ID <span className="font-mono font-bold">{id}</span>{" "}
            could not be found in our system.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleCloseNotFoundSheet}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Leads
          </Button>
        </div>
      </div>
    );
  }, []);

  return (
    <>
      <LeadsPage
        leads={leads}
        loading={loading}
        handleGetLeads={handleGetLeads}
        handleUpdateLead={handleUpdateLead}
        handleRemoveLead={handleRemoveLead}
        handleAddOpportunity={handleAddOpportunity}
      />

      <SheetComponent
        open={showNotFoundSheet}
        onOpenChange={setShowNotFoundSheet}
        trigger={""}
        title="Lead Not Found"
        description="The lead you are looking for does not exist."
        children={leadDetailsContent}
      />
    </>
  );
};
