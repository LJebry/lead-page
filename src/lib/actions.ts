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


/*
Helper function to handle acidental whitespace from user input
for example "  John Doe  " will be trimmed to "John Doe"
*/ 
function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}
/*
Validates the lead input from the form data. It checks for required fields, email format, and valid source. It returns an object containing the lead data, any field errors, and a boolean indicating if the input is valid.
*/
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


  /* 
  this function is the server action that will be called when the form is submitted. It validates the input, saves the lead to the database, and forwards it to the webhook. It returns a state object that indicates whether the submission was successful and any error messages to display to the user.
  */
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
    if (error.code === "23505") // 23505 is the Postgres error code for unique violation, which means a lead with the same email already exists 
    { 
      return {
        success: false,
        message: "A lead with this email already exists.",
        fieldErrors: {
          email: "This email has already been submitted.",
        },
      };
    }

    console.error("Failed to save lead", error);

    // For other uncatched types of errors return a generic message
    return {
      success: false,
      message: "Something went wrong while saving your information.",
    };
  }

  // Forward the lead to the webhook, but don't fail the request if the webhook call fails. We want to ensure that the lead is saved in our database even if the webhook is down or has issues.
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
