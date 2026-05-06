import type { LeadInput } from "@/types/lead";

export async function forwardLeadToWebhook(lead: LeadInput) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL; 
  const candidateName = process.env.CANDIDATE_NAME;

  if (!webhookUrl) {
    throw new Error("Missing LEAD_WEBHOOK_URL environment variable.");
  }

  if (!candidateName) {
    throw new Error("Missing CANDIDATE_NAME environment variable.");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Candidate-Name": candidateName,
    },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    const responseBody = await response.text().catch(() => "");

    throw new Error(
      `Webhook failed with ${response.status} ${response.statusText}${
        responseBody ? `: ${responseBody}` : ""
      }`,
    );
  }
}
