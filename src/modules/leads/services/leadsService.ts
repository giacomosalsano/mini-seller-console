import type { Lead } from "../types";

export const getLeads = async (): Promise<Lead[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1300));

  try {
    const response = await fetch("/leads.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Lead[] = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch leads:", error);

    return [];
  }
};
