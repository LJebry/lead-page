export const LEAD_SOURCES = ["Google", "Referral", "Social", "Other"] as const;
export type LeadSource = typeof LEAD_SOURCES[number];

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
