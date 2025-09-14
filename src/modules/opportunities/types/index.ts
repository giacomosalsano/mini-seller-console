export enum OpportunityStage {
  New = "New",
  ProposalSent = "Proposal Sent",
  Negotiation = "Negotiation",
  Accepted = "Accepted",
  Declined = "Declined",
}

export interface Opportunity {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  stage: OpportunityStage;
  amountInCents: number;
  accountName: string;
}
