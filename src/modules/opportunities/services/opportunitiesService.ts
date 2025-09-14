import type { Opportunity } from "../types";

export const getOpportunities = async (): Promise<Opportunity[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1300));

  try {
    const response = await fetch("/opportunities.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Opportunity[] = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch leads:", error);

    return [];
  }
};
