import { useOpportunities } from "../../../modules/opportunities/hooks/useOpportunities";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { OpportunitiesPage } from "../index";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserX } from "lucide-react";
import { SheetComponent } from "@/components/shared/sheet-component";

export const OpportunitiesPageWrapper = () => {
  const { opportunities, loading, handleGetOpportunities } = useOpportunities();
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showNotFoundSheet, setShowNotFoundSheet] = useState(false);

  useEffect(() => {
    handleGetOpportunities({ props: {} });
  }, [handleGetOpportunities]);

  const isOpportunityRoute = location.pathname.startsWith(
    "/opportunities/details/",
  );

  useEffect(() => {
    if (isOpportunityRoute && !loading && opportunities.length > 0 && id) {
      const currentOpportunity = opportunities.find(
        (opportunity) => opportunity.id === id,
      );

      if (!currentOpportunity) {
        setShowNotFoundSheet(true);
      } else {
        setShowNotFoundSheet(false);
      }
    }
  }, [isOpportunityRoute, loading, opportunities, id]);

  const handleCloseNotFoundSheet = () => {
    setShowNotFoundSheet(false);
    navigate("/opportunities");
  };

  const opportunityDetailsContent = useMemo(() => {
    return (
      <div className="flex flex-col items-center gap-6 py-6">
        <UserX className="text-destructive h-10 w-10" />
        <div className="text-center">
          <p className="text-muted-foreground">
            The opportunity with ID{" "}
            <span className="font-mono font-bold">{id}</span> could not be found
            in our system.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleCloseNotFoundSheet}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Opportunities
          </Button>
        </div>
      </div>
    );
  }, []);

  return (
    <>
      <OpportunitiesPage
        opportunities={opportunities}
        loading={loading}
        handleGetOpportunities={handleGetOpportunities}
      />

      <SheetComponent
        open={showNotFoundSheet}
        onOpenChange={setShowNotFoundSheet}
        trigger={""}
        title="Opportunity Not Found"
        description="The opportunity you are looking for does not exist."
        children={opportunityDetailsContent}
      />
    </>
  );
};
