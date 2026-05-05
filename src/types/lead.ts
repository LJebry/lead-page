export type LeadSource = "Google" | "Referral" | "Social" | "Other";

export type LeadInput = {
  name: string;
  email: string;
  company?: string;
  source: LeadSource;
  message?: string;
};

export type Lead = LeadInput & {
  id: string;
  created_at: string;
};
