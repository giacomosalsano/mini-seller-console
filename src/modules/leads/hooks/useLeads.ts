import { useCallback, useState } from "react";
import type { Lead } from "../types";
import { getLeads } from "../services/leadsService";
import { toast } from "sonner";

type Handler<T, R = void> = {
  props: T;
  onSuccess?: (response?: R) => void;
  onError?: (error: Error) => void;
};

interface Properties {
  loading: boolean;
  leads: Lead[];
}

const LEADS_STORAGE_KEY = "mini-seller-leads";

export const useLeads = () => {
  const [properties, setProperties] = useState<Properties>({
    loading: false,
    leads: [],
  });

  const handleSetProperties = useCallback(
    (newProperties: Partial<Properties>) => {
      setProperties((prev) => ({ ...prev, ...newProperties }));
    },
    [],
  );

  const handleGetLeads = useCallback(
    async ({ onSuccess, onError }: Handler<{}, Lead[]>) => {
      handleSetProperties({ loading: true });

      try {
        const localData = localStorage.getItem(LEADS_STORAGE_KEY);
        if (localData) {
          const leads = JSON.parse(localData);
          handleSetProperties({ leads });
          if (onSuccess) onSuccess(leads);

          return;
        }

        const data = await getLeads();
        handleSetProperties({ leads: data });

        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(data));

        if (onSuccess) {
          onSuccess(data);
          return data;
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);
          return;
        }

        toast.error("Error listing leads");
      } finally {
        handleSetProperties({ loading: false });
      }
    },
    [],
  );

  const handleAddLead = useCallback(
    async ({ props, onSuccess, onError }: Handler<Omit<Lead, "id">>) => {
      handleSetProperties({ loading: true });
      await new Promise((resolve) => setTimeout(resolve, 500));

      try {
        const newLead: Lead = {
          ...props,
          id: `${Math.floor(Math.random() * 111) + 110}`,
        };

        const newLeads = [...properties.leads, newLead];

        handleSetProperties({ leads: newLeads });
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(newLeads));

        toast.success("Lead added successfully!");
        if (onSuccess) onSuccess();
      } catch (error) {
        if (onError) {
          onError(error as Error);
          return;
        }
        toast.error("Error adding lead");
      } finally {
        handleSetProperties({ loading: false });
      }
    },
    [properties.leads, handleSetProperties],
  );

  const handleUpdateLead = useCallback(
    async ({ props, onSuccess, onError }: Handler<Lead>) => {
      handleSetProperties({ loading: true });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const updatedLeads = properties.leads.map((lead) =>
          lead.id === props.id ? { ...lead, ...props } : lead,
        );

        handleSetProperties({ leads: updatedLeads });
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));

        toast.success("Lead updated successfully!");

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);
          return;
        }
        toast.error("Error updating lead");
      } finally {
        handleSetProperties({ loading: false });
      }
    },
    [properties.leads, handleSetProperties],
  );

  const handleRemoveLead = useCallback(
    async ({ props, onSuccess, onError }: Handler<{ id: string }>) => {
      try {
        const updatedLeads = properties.leads.filter(
          (lead) => lead.id !== props.id,
        );

        handleSetProperties({ leads: updatedLeads });
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);
          return;
        }
        toast.error("Error converting lead");
      }
    },
    [properties.leads, handleSetProperties],
  );

  return {
    leads: properties.leads,
    loading: properties.loading,
    handleGetLeads,
    handleAddLead,
    handleUpdateLead,
    handleRemoveLead,
  };
};
