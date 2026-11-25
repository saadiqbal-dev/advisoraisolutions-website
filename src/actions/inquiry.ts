"use server";

import { z } from "zod";
import { site } from "@/lib/site";

export type InquiryState = {
  ok: boolean;
  message?: string;
  mailto?: string;
  errors?: Record<string, string>;
};

const schema = z.object({
  kind: z.enum(["contact", "assessment"]),
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email.").max(160),
  company: z.string().trim().min(1, "Enter your company.").max(160),
  firmType: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  details: z.string().trim().max(5000).optional().or(z.literal("")),
});

function isAllowedEndpoint(raw: string) {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return false;
    if (host === "0.0.0.0" || host.startsWith("127.") || host.startsWith("10.") || host.startsWith("192.168.")) return false;
    if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) return false;
    return true;
  } catch {
    return false;
  }
}

function mailtoFor(fields: Record<string, string>, kind: string) {
  const subject = encodeURIComponent(
    kind === "assessment"
      ? `AI Visibility Score from ${fields.name}`
      : `Discovery inquiry from ${fields.name}`,
  );
  const body = encodeURIComponent(
    Object.entries(fields)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")
      .slice(0, 1800),
  );
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export async function submitInquiry(_prev: InquiryState | null, formData: FormData): Promise<InquiryState> {
  const honeypot = String(formData.get("company_fax") ?? "");
  if (honeypot.trim()) {
    return { ok: true, message: "Received." };
  }

  const raw = {
    kind: String(formData.get("kind") ?? "contact"),
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    firmType: String(formData.get("firmType") ?? ""),
    message: String(formData.get("message") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    role: String(formData.get("role") ?? ""),
    website: String(formData.get("website") ?? ""),
    details: String(formData.get("details") ?? ""),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors, message: "Check the highlighted fields." };
  }

  if (parsed.data.kind === "contact" && !parsed.data.message) {
    return { ok: false, errors: { message: "Add a short note about what you want to talk through." } };
  }

  const fields: Record<string, string> = {
    kind: parsed.data.kind,
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company,
    firmType: parsed.data.firmType ?? "",
    role: parsed.data.role ?? "",
    phone: parsed.data.phone ?? "",
    website: parsed.data.website ?? "",
    message: parsed.data.message ?? "",
    details: parsed.data.details ?? "",
  };
  const mailto = mailtoFor(fields, parsed.data.kind);
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;

  if (endpoint && isAllowedEndpoint(endpoint)) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ ...fields, source: "advisoraisolutions.io" }),
        signal: AbortSignal.timeout(8000),
      });
      if (response.ok) {
        return { ok: true, message: "Received. Jordan reviews every inquiry." };
      }
    } catch {
      // Fall through to mailto so the submission is not dropped.
    }
    return {
      ok: false,
      mailto,
      message: "The form endpoint did not accept this. Use the email link so your note is not lost.",
    };
  }

  return {
    ok: true,
    mailto,
    message: "No form endpoint is configured, so this opens an email to Jordan with your answers filled in.",
  };
}
