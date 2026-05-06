"use server";

import { createSupabaseServerClient } from "@/lib/supabase";
import { forwardLeadToWebhook } from "@/lib/webhook";
import { LEAD_SOURCES } from "@/types/lead";
import type { LeadInput, LeadSource } from "@/types/lead";

export type CreateLeadState = {
  success: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof LeadInput, string>>;
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function validateLead(formData: FormData) {
  const fieldErrors: CreateLeadState["fieldErrors"] = {};

  const lead: LeadInput = {
    name: getStringValue(formData, "name"),
    email: getStringValue(formData, "email").toLowerCase(),
    company: getStringValue(formData, "company") || undefined,
    source: getStringValue(formData, "source") as LeadSource,
    message: getStringValue(formData, "message") || undefined,
  };

  if (!lead.name) {
    fieldErrors.name = "Full name is required.";
  }

  if (!lead.email) {
    fieldErrors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (!LEAD_SOURCES.includes(lead.source as LeadSource)) {
    fieldErrors.source = "Choose how you heard about us.";
  }

  return {
    lead,
    fieldErrors,
    isValid: Object.keys(fieldErrors).length === 0,
  };
}

export async function createLeadAction(
  _previousState: CreateLeadState,
  formData: FormData,
): Promise<CreateLeadState> {
  const validation = validateLead(formData);

  if (!validation.isValid) {
    return {
      success: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: validation.fieldErrors,
    };
  }

  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from("leads").insert({
    name: validation.lead.name,
    email: validation.lead.email,
    company: validation.lead.company ?? null,
    source: validation.lead.source,
    message: validation.lead.message ?? null,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        message: "A lead with this email already exists.",
        fieldErrors: {
          email: "This email has already been submitted.",
        },
      };
    }

    console.error("Failed to save lead", error);

    return {
      success: false,
      message: "Something went wrong while saving your information.",
    };
  }

  try {
    await forwardLeadToWebhook(validation.lead);
  } catch (error) {
    console.error("Lead webhook failed", error);
  }

  return {
    success: true,
    message: "Thanks. Your information was submitted successfully.",
  };
}
