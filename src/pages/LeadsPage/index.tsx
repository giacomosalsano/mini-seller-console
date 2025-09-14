import { useEffect } from "react";
import { useLeads } from "../../modules/leads/hooks/useLeads";
import { LeadsTable } from "./components/leads-table";
import { createColumns } from "./components/columns";

export const LeadsPage = () => {
  const { leads, loading, handleGetLeads, handleUpdateLead } = useLeads();
  const columns = createColumns({
    onUpdateLead: (lead) => handleUpdateLead({ props: lead }),
  });

  useEffect(() => {
    handleGetLeads({ props: {} });
  }, []);

  return (
    <div className="p-4 pb-20 text-center md:w-full lg:mx-auto lg:px-8 lg:pt-10">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
        <p className="text-muted-foreground">Manage your leads</p>
      </div>

      <LeadsTable leads={leads} loading={loading} columns={columns} />
    </div>
  );
};
