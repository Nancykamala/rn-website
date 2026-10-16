import { z } from "zod";

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

export const contactSchema = z.object({
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

export type ContactFormValues = z.infer<typeof contactSchema>;
