import { useEffect } from "react";
import { useOpportunities } from "../../modules/opportunities/hooks/useOpportunities";
import { OpportunitiesTable } from "./components/opportunities-table";
import { createColumns } from "./components/columns";
import { useLocation, useParams } from "react-router-dom";
import { OpportunityDetails } from "./components/actions/opportunity-detail";

export const OpportunitiesPage = () => {
  const { opportunities, loading, handleGetOpportunities } = useOpportunities();
  const location = useLocation();
  const { id } = useParams();

  const columns = createColumns();

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
      />

      {currentOpportunity &&
        location.pathname === `/opportunities/details/${id}` && (
          <OpportunityDetails opportunity={currentOpportunity} />
        )}
    </div>
  );
};
