import { createClient } from "@supabase/supabase-js";
import { contactSchema } from "./_lib/schema";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[api/enquiry] Validation error:", error);
    return res.status(400).json({ ok: false, error: "Invalid request" });
  }
}
