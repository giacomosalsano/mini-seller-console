import { useEffect } from "react";
import { OpportunitiesTable } from "./components/opportunities-table";
import { createColumns } from "./components/columns";
import { useLocation, useParams } from "react-router-dom";
import { OpportunityDetails } from "./components/actions/opportunity-detail";
import type { Opportunity } from "@/modules/opportunities/types";

interface OpportunitiesPageProps {
  opportunities: Opportunity[];
  loading: boolean;
  handleGetOpportunities: (props: { props: {} }) => void;
  handleUpdateOpportunity: (props: { props: Opportunity }) => void;
  handleAddOpportunity: (props: { props: Opportunity }) => void;
}

export const OpportunitiesPage = ({
  opportunities,
  loading,
  handleGetOpportunities,
  handleUpdateOpportunity,
  handleAddOpportunity,
}: OpportunitiesPageProps) => {
  const location = useLocation();
  const { id } = useParams();

  const columns = createColumns({
    onUpdateOpportunity: (opportunity) =>
      handleUpdateOpportunity({ props: opportunity }),
    loading: loading,
  });

  const currentOpportunity = opportunities.find(
    (opportunity) => opportunity.id === id,
  );

  useEffect(() => {
    handleGetOpportunities({ props: {} });
  }, []);

  return (
    <div className="p-4 pb-20 text-center md:w-full lg:mx-auto lg:px-8 lg:pt-10">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Opportunities</h2>
        <p className="text-muted-foreground">Manage your opportunities</p>
      </div>

      <OpportunitiesTable
        opportunities={opportunities}
        loading={loading}
        columns={columns}
        onAddOpportunity={(opportunity: Opportunity) =>
          handleAddOpportunity({ props: opportunity })
        }
      />

      {currentOpportunity &&
        location.pathname === `/opportunities/details/${id}` && (
          <OpportunityDetails opportunity={currentOpportunity} />
        )}
    </div>
  );
};
