import { useEffect } from "react";
import { LeadsTable } from "./components/leads-table";
import { createColumns } from "./components/columns";
import { useLocation, useParams } from "react-router-dom";
import { EditLead } from "./components/actions/edit-lead";
import { LeadDetails } from "./components/actions/lead-detail";
import type { Lead } from "@/modules/leads/types";
import type { Opportunity } from "@/modules/opportunities/types";

interface LeadsPageProps {
  leads: Lead[];
  loading: boolean;
  handleGetLeads: (props: { props: {} }) => void;
  handleUpdateLead: (props: { props: Lead }) => void;
  handleRemoveLead: (props: { props: { id: string } }) => void;
  handleAddOpportunity: (props: { props: Opportunity }) => void;
}

export const LeadsPage = ({
  leads,
  loading,
  handleGetLeads,
  handleUpdateLead,
  handleRemoveLead,
  handleAddOpportunity,
}: LeadsPageProps) => {
  const location = useLocation();
  const { id } = useParams();

  const columns = createColumns({
    onUpdateLead: (lead) => handleUpdateLead({ props: lead }),
    onRemoveLead: (id) => handleRemoveLead({ props: { id } }),
    onAddOpportunity: (opportunity) =>
      handleAddOpportunity({ props: opportunity }),
  });

  const currentLead = leads.find((lead) => lead.id === id);

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

      {/* Renderiza apenas o componente correspondente à rota atual */}
      {currentLead && location.pathname === `/leads/edit/${id}` && (
        <EditLead
          lead={currentLead}
          onUpdateLead={(updatedLead) =>
            handleUpdateLead({ props: updatedLead })
          }
        />
      )}

      {currentLead && location.pathname === `/leads/details/${id}` && (
        <LeadDetails lead={currentLead} />
      )}
    </div>
  );
};
