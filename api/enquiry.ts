import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const SERVICES_OPTIONS = [
  "Dashboards",
  "KPI strategy",
  "Data integration",
  "Automation",
  "Performance audit",
  "Microsoft 365 / Teams setup",
  "SharePoint & Forms",
  "Process automation",
  "Training",
] as const;

const phoneNormalize = (raw: string) =>
  raw.replace(/[^\d+]/g, "").replace(/^\+?91/, "").replace(/^0/, "").slice(-10);

const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your name (2+ characters)")
    .max(100, "Name is too long"),
  workEmail: z
    .string()
    .trim()
    .min(3, "Please enter your email")
    .email("Please enter a valid email address")
    .max(200),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company name")
    .max(200),
  jobTitle: z.string().trim().max(120).optional(),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => !v || v.length === 0 || /^[6-9]\d{9}$/.test(phoneNormalize(v)),
      "Enter a valid 10-digit Indian mobile number"
    )
    .transform((v) => (v ? phoneNormalize(v) : ""))
    .optional(),
  companySize: z.string().trim().max(60).optional(),
  services: z.array(z.enum(SERVICES_OPTIONS)).optional(),
  budget: z.string().trim().max(60).optional(),
  timeline: z.string().trim().max(60).optional(),
  message: z.string().trim().max(2000).optional(),
  _hp: z.string().trim().max(200).optional(),
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;
const notifyEmail = process.env.NOTIFY_EMAIL;

console.log("[api/enquiry] Environment check:", {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseServiceKey,
  urlPrefix: supabaseUrl?.substring(0, 20),
});

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("[api/enquiry] Missing Supabase environment variables");
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

type RateLimitEntry = {
  count: number;
  resetTime: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("[api/enquiry] Request received:", { method: req.method });

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    (req.headers["x-real-ip"] as string) ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return res.status(429).json({ ok: false, error: "Too many requests" });
  }

  try {
    const body = req.body;
    console.log("[api/enquiry] Request body keys:", Object.keys(body));
    const validated = contactSchema.parse(body);
    console.log("[api/enquiry] Validation passed");

    if (validated._hp && validated._hp.length > 0) {
      console.log("[api/enquiry] Honeypot triggered");
      return res.status(200).json({ ok: true });
    }

    console.log("[api/enquiry] Inserting into Supabase...");
    const { error, data } = await supabase.from("enquiries").insert({
      name: validated.fullName,
      phone: validated.phone || null,
      email: validated.workEmail,
      business: validated.company,
      services: validated.services || [],
      message: validated.message || null,
    }).select();

    console.log("[api/enquiry] Insert result:", { error, dataCount: data?.length });

    if (error) {
      console.error("[api/enquiry] Supabase error:", error);
      return res.status(500).json({ ok: false, error: "Something went wrong" });
    }

    console.log("[api/enquiry] Insert successful");

    // Send notification email via Resend
    if (resendApiKey && notifyEmail) {
      try {
        const resend = new Resend(resendApiKey);
        const submittedAt = new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "medium",
        });

        const emailBody = [
          `Name: ${validated.fullName}`,
          `Phone: ${validated.phone || "Not provided"}`,
          `Email: ${validated.workEmail}`,
          `Business: ${validated.company}`,
          `Services: ${validated.services?.join(", ") || "None selected"}`,
          `Message: ${validated.message || "No message"}`,
          `Submitted: ${submittedAt}`,
        ].join("\n\n");

        await resend.emails.send({
          from: "RN Website <onboarding@resend.dev>",
          to: notifyEmail,
          subject: `New enquiry from ${validated.fullName}`,
          text: emailBody,
          replyTo: validated.workEmail,
        });

        console.log("[api/enquiry] Email notification sent");
      } catch (emailError) {
        console.error("[api/enquiry] Failed to send email notification:", emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log("[api/enquiry] Skipping email notification - missing RESEND_API_KEY or NOTIFY_EMAIL");
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[api/enquiry] Validation error:", error);
    return res.status(400).json({ ok: false, error: "Invalid request" });
  }
}
