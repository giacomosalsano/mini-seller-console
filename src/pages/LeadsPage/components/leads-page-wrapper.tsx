import { useLeads } from "../../../modules/leads/hooks/useLeads";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LeadsPage } from "../index";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserX } from "lucide-react";

export const LeadsPageWrapper = () => {
  const { leads, loading, handleGetLeads } = useLeads();
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showNotFoundSheet, setShowNotFoundSheet] = useState(false);

  useEffect(() => {
    handleGetLeads({ props: {} });
  }, [handleGetLeads]);

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

  return (
    <>
      <LeadsPage />

      <Sheet open={showNotFoundSheet} onOpenChange={setShowNotFoundSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <UserX className="text-destructive h-5 w-5" />
              User Not Found
            </SheetTitle>
            <SheetDescription>
              The user you are looking for does not exist.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 py-6">
            <div className="text-center">
              <p className="text-muted-foreground">
                The user with ID{" "}
                <span className="font-mono font-bold">{id}</span> could not be
                found in our system.
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
        </SheetContent>
      </Sheet>
    </>
  );
};
