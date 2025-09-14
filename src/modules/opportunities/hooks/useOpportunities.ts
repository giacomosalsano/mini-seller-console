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

const OPPORTUNITIES_STORAGE_KEY = "mini-seller-opportunities";

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
        const localData = localStorage.getItem(OPPORTUNITIES_STORAGE_KEY);
        if (localData) {
          const opportunities = JSON.parse(localData);
          handleSetProperties({ opportunities });
          if (onSuccess) onSuccess(opportunities);
          return;
        }

        const data = await getOpportunities();
        handleSetProperties({ opportunities: data });

        localStorage.setItem(OPPORTUNITIES_STORAGE_KEY, JSON.stringify(data));

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

  const handleAddOpportunity = useCallback(
    async ({ props, onSuccess, onError }: Handler<Opportunity>) => {
      try {
        const newOpportunities = [...properties.opportunities, props];

        handleSetProperties({ opportunities: newOpportunities });
        localStorage.setItem(
          OPPORTUNITIES_STORAGE_KEY,
          JSON.stringify(newOpportunities),
        );

        toast.success("Opportunity added successfully!");

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);
          return;
        }
        toast.error("Error adding opportunity");
      }
    },
    [properties.opportunities, handleSetProperties],
  );

  return {
    opportunities: properties.opportunities,
    loading: properties.loading,
    handleGetOpportunities,
    handleAddOpportunity,
  };
};
