import { useEffect } from "react";
import { useOpportunities } from "../../modules/opportunities/hooks/useOpportunities";
import { OpportunitiesTable } from "./components/opportunities-table";
import { createColumns } from "./components/columns";

export const OpportunitiesPage = () => {
  const { opportunities, loading, handleGetOpportunities } = useOpportunities();
  const columns = createColumns();

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
    </div>
  );
};
