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
    async ({ props, onSuccess, onError }: Handler<Omit<Opportunity, "id">>) => {
      try {
        const newOpportunity: Opportunity = {
          ...props,
          id: `${Math.floor(Math.random() * 111) + 110}`,
        };

        handleSetProperties({
          opportunities: [...properties.opportunities, newOpportunity],
        });

        localStorage.setItem(
          OPPORTUNITIES_STORAGE_KEY,
          JSON.stringify([...properties.opportunities, newOpportunity]),
        );

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

  const handleUpdateOpportunity = useCallback(
    async ({ props, onSuccess, onError }: Handler<Opportunity>) => {
      try {
        const updatedOpportunities = properties.opportunities.map(
          (opportunity) => (opportunity.id === props.id ? props : opportunity),
        );

        handleSetProperties({ opportunities: updatedOpportunities });
        localStorage.setItem(
          OPPORTUNITIES_STORAGE_KEY,
          JSON.stringify(updatedOpportunities),
        );

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);
          return;
        }
        toast.error("Error editing opportunity");
      }
    },
    [properties.opportunities, handleSetProperties],
  );

  return {
    opportunities: properties.opportunities,
    loading: properties.loading,
    handleGetOpportunities,
    handleAddOpportunity,
    handleUpdateOpportunity,
  };
};
