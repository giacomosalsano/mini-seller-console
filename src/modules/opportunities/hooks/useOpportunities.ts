import { useCallback, useState } from "react";
import type { Opportunity } from "../types";
import { toast } from "sonner";
import { getOpportunities } from "../services/opportunitiesService";

type Handler<T, R = void> = {
  props: T;
  onSuccess?: (response?: R) => void;
  onError?: (error: Error) => void;
};

interface Properties {
  loading: boolean;
  opportunities: Opportunity[];
}

export const useOpportunities = () => {
  const [properties, setProperties] = useState<Properties>({
    loading: false,
    opportunities: [],
  });

  const handleSetProperties = useCallback(
    (newProperties: Partial<Properties>) => {
      setProperties((prev) => ({ ...prev, ...newProperties }));
    },
    [],
  );

  const handleGetOpportunities = useCallback(
    async ({ onSuccess, onError }: Handler<{}, Opportunity[]>) => {
      handleSetProperties({ loading: true });

      try {
        const data = await getOpportunities();

        handleSetProperties({ opportunities: data });

        if (onSuccess) {
          onSuccess(data);
          return data;
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);
          return;
        }

        toast.error("Error listing opportunities");
      } finally {
        handleSetProperties({ loading: false });
      }
    },
    [],
  );

  return {
    opportunities: properties.opportunities,
    loading: properties.loading,
    handleGetOpportunities,
  };
};
