import { useCallback,  useState } from "react";
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
        const data = await getLeads();

        handleSetProperties({ leads: data });

        toast.success("Leads listed successfully");

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

  return {
    leads: properties.leads,
    loading: properties.loading,
    handleGetLeads,
  };
};
