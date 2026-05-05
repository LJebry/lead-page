import type { LeadInput } from "@/types/lead";

export async function forwardLeadToWebhook(_lead: LeadInput) {
  void _lead;

  // TODO: POST server-side to process.env.LEAD_WEBHOOK_URL with
  // X-Candidate-Name: process.env.CANDIDATE_NAME.
  // Requirement: webhook failure should be logged but should not fail the user
  // submission after the Supabase insert succeeds.
}
