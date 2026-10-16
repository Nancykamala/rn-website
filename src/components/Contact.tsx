import { useState, type CSSProperties } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { SxProps, Theme } from "@mui/material/styles";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { tokens } from "../theme/theme";
import { contact } from "../content/siteContent";
import useReveal from "../hooks/useReveal";

const SERVICES_OPTIONS = contact.form.servicesOptions;
const COMPANY_SIZE_OPTIONS = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
  "Prefer not to say",
];
const BUDGET_OPTIONS = [
  "Under ₹50K",
  "₹50K – ₹2L",
  "₹2L – ₹5L",
  "₹5L – ₹15L",
  "₹15L+",
  "TBD / Not sure",
];
const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 4 weeks",
  "Within 3 months",
  "3-6 months",
  "Flexible / Exploring",
];

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
  services: z
    .array(z.enum(SERVICES_OPTIONS as [string, ...string[]]))
    .optional(),
  budget: z.string().trim().max(60).optional(),
  timeline: z.string().trim().max(60).optional(),
  message: z.string().trim().max(2000).optional(),
  _hp: z.string().trim().max(200).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

const DEFAULT_VALUES: ContactFormValues = {
  fullName: "",
  workEmail: "",
  company: "",
  jobTitle: "",
  phone: "",
  companySize: "",
  services: [],
  budget: "",
  timeline: "",
  message: "",
  _hp: "",
};

const infoCardSx: SxProps<Theme> = {
  p: 2.8,
  height: "100%",
  borderRadius: 1,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: (theme) =>
    theme.palette.mode === "dark" ? "rgba(255,255,255,.04)" : "#ffffff",
  transition:
    "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    borderColor: (theme) =>
      theme.palette.mode === "dark"
        ? "rgba(124,92,255,.45)"
        : "rgba(91,61,245,.35)",
    boxShadow: (theme) =>
      theme.palette.mode === "dark"
        ? "0 18px 42px -24px rgba(124,92,255,.6)"
        : "0 18px 42px -24px rgba(91,61,245,.38)",
  },
};

const fieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 1,
    backgroundColor: (theme) =>
      theme.palette.mode === "dark" ? "rgba(255,255,255,.03)" : "#ffffff",
    transition: "box-shadow .2s, border-color .2s",
    "& fieldset": {
      transition: "border-color .2s",
    },
    "&:hover fieldset": {
      borderColor: (theme) =>
        theme.palette.mode === "dark"
          ? "rgba(124,92,255,.4)"
          : "rgba(91,61,245,.3)",
    },
    "&.Mui-focused fieldset": {
      borderWidth: 1.5,
      borderColor: (theme) =>
        theme.palette.mode === "dark" ? "#7c5cff" : "#5b3df5",
    },
    "& input, & textarea": {
      fontSize: 15.5,
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 600,
    fontSize: 14.5,
    color: "text.secondary",
  },
};

interface InfoCardProps {
  icon: string;
  label: string;
  value: string;
  href: string;
}

const InfoCard = ({ icon, label, value, href }: InfoCardProps) => (
  <Paper elevation={0} sx={infoCardSx}>
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(124,92,255,.22), rgba(34,211,238,.2))"
              : "linear-gradient(135deg, rgba(91,61,245,.14), rgba(8,145,178,.13))",
          border: "1px solid",
          borderColor: "divider",
        }}
        aria-hidden="true"
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            fontWeight: 700,
            color: "text.secondary",
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: ".06em",
            mb: 0.6,
          }}
        >
          {label}
        </Typography>
        <Link
          href={href}
          underline="none"
          color="text.primary"
          sx={{
            display: "inline-block",
            fontSize: 16.5,
            fontWeight: 700,
            letterSpacing: "-.01em",
            wordBreak: "break-word",
            "&:hover": {
              color: (theme) =>
                theme.palette.mode === "dark" ? "#7c5cff" : "#5b3df5",
            },
          }}
        >
          {value}
        </Link>
      </Box>
    </Box>
  </Paper>
);

const Contact = () => {
  const headReveal = useReveal<HTMLDivElement>({ threshold: 0.06 });
  const formReveal = useReveal<HTMLDivElement>({ threshold: 0.05 });
  const [snack, setSnack] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({ open: false, type: "success", message: "" });

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const selectedServices = watch("services");

  const toggleService = (label: string) => {
    const current = selectedServices || [];
    const next = current.includes(label)
      ? current.filter((s) => s !== label)
      : [...current, label];
    setValue("services", next, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    try {
      if (values._hp && values._hp.length > 0) {
        setSnack({
          open: true,
          type: "success",
          message: contact.form.successMessage,
        });
        reset(DEFAULT_VALUES);
        return;
      }

      // In development, simulate successful submission
      if (import.meta.env.DEV) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.log("[Dev Mode] Form submission:", values);
        reset(DEFAULT_VALUES);
        setSnack({
          open: true,
          type: "success",
          message: contact.form.successMessage,
        });
        return;
      }

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Submission failed");
      }

      reset(DEFAULT_VALUES);
      setSnack({
        open: true,
        type: "success",
        message: contact.form.successMessage,
      });
    } catch {
      setSnack({
        open: true,
        type: "error",
        message: contact.form.errorMessage,
      });
    }
  };

  return (
    <Box
      component="section"
      id={contact.id}
      sx={{
        paddingTop: `${tokens.design.sectionPadding}px`,
        paddingBottom: `${tokens.design.sectionPadding}px`,
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: -1,
          pointerEvents: "none",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "radial-gradient(55% 45% at 50% 0%, rgba(124,92,255,.12) 0%, transparent 70%)"
              : "radial-gradient(55% 45% at 50% 0%, rgba(91,61,245,.08) 0%, transparent 70%)",
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: tokens.design.maxWidth,
          paddingLeft: `${tokens.design.sidePadding}px`,
          paddingRight: `${tokens.design.sidePadding}px`,
          position: "relative",
        }}
      >
        <Box
          ref={headReveal.ref}
          style={headReveal.style as CSSProperties}
          sx={{ mb: { xs: 6, md: 7.5 } }}
        >
          <Typography
            variant="overline"
            sx={{ display: "inline-block", mb: 1.6 }}
          >
            {contact.tag}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0,1.1fr) minmax(0,1fr)",
              },
              gap: { xs: 3, md: 6 },
              alignItems: "end",
            }}
          >
            <Box sx={{ maxWidth: "56ch" }}>
              <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
                {contact.h2}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 17, lineHeight: 1.7 }}>
                {contact.sub}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {contact.bullets.map((b) => (
                <Box
                  key={b}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.4,
                  }}
                >
                  <Box
                    aria-hidden="true"
                    sx={{
                      mt: "3px",
                      width: 20,
                      height: 20,
                      flexShrink: 0,
                      borderRadius: 9999,
                      background: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(52,211,153,.18)"
                          : "rgba(5,150,105,.14)",
                      color: "success.main",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    ✓
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: 15.5, color: "text.primary", fontWeight: 500 }}
                  >
                    {b}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3,1fr)",
            },
            gap: { xs: 2, sm: 2.4, md: 3 },
            mb: { xs: 5, md: 6 },
          }}
        >
          {contact.info.map((item) => (
            <InfoCard
              key={item.label}
              icon={item.icon}
              label={item.label}
              value={item.value}
              href={item.href}
            />
          ))}
        </Box>

        <Box
          ref={formReveal.ref}
          style={formReveal.style as CSSProperties}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.8, sm: 4, md: 5 },
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,.035)"
                  : "#ffffff",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 30px 80px -36px rgba(124,92,255,.35)"
                  : "0 30px 80px -36px rgba(91,61,245,.22)",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Enquiry form"
            >
              <Box
                sx={{
                  position: "absolute",
                  left: -9999,
                  top: "auto",
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                }}
                aria-hidden="true"
              >
                <label>
                  Do not fill this field
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("_hp")}
                  />
                </label>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2,1fr)",
                  },
                  gap: { xs: 2.2, sm: 2.6, md: 3 },
                  mb: { xs: 2.6, md: 3.2 },
                }}
              >
                <TextField
                  required
                  label={contact.form.fullNameLabel}
                  {...register("fullName")}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  sx={fieldSx}
                  autoComplete="name"
                />
                <TextField
                  required
                  label={contact.form.workEmailLabel}
                  type="email"
                  {...register("workEmail")}
                  error={!!errors.workEmail}
                  helperText={errors.workEmail?.message}
                  sx={fieldSx}
                  autoComplete="email"
                />
                <TextField
                  required
                  label={contact.form.companyLabel}
                  {...register("company")}
                  error={!!errors.company}
                  helperText={errors.company?.message}
                  sx={fieldSx}
                  autoComplete="organization"
                />
                <TextField
                  label={contact.form.jobTitleLabel}
                  {...register("jobTitle")}
                  error={!!errors.jobTitle}
                  helperText={errors.jobTitle?.message}
                  sx={fieldSx}
                  autoComplete="organization-title"
                />
                <TextField
                  label={contact.form.phoneLabel}
                  type="tel"
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={
                    errors.phone?.message ?? "10-digit Indian mobile (optional)"
                  }
                  sx={fieldSx}
                  autoComplete="tel-national"
                  slotProps={{ input: { inputMode: "tel" } }}
                />
                <FormControl error={!!errors.companySize} sx={{ ...fieldSx }}>
                  <InputLabel id="company-size-label">
                    {contact.form.companySizeLabel}
                  </InputLabel>
                  <Controller
                    name="companySize"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        labelId="company-size-label"
                        label={contact.form.companySizeLabel}
                        value={field.value || ""}
                        onChange={(e: SelectChangeEvent<string>) =>
                          field.onChange(e.target.value)
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                      >
                        <MenuItem value="">Prefer not to say</MenuItem>
                        {COMPANY_SIZE_OPTIONS.map((opt) => (
                          <MenuItem key={opt} value={opt}>
                            {opt}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.companySize?.message ? (
                    <FormHelperText>
                      {errors.companySize.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Box>

              <Box sx={{ mb: { xs: 2.6, md: 3.2 } }}>
                <FormLabel
                  component="legend"
                  sx={{
                    display: "block",
                    mb: 1.6,
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: errors.services ? "error.main" : "text.secondary",
                  }}
                >
                  {contact.form.servicesLabel}
                </FormLabel>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: { xs: 1.1, sm: 1.4 },
                  }}
                >
                  {SERVICES_OPTIONS.map((label) => {
                    const active = (selectedServices || []).includes(label);
                    return (
                      <Chip
                        key={label}
                        label={label}
                        clickable
                        onClick={() => toggleService(label)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleService(label);
                          }
                        }}
                        tabIndex={0}
                        role="option"
                        aria-selected={active}
                        sx={{
                          height: { xs: 40, sm: 44 },
                          px: 0.2,
                          fontSize: { xs: 14, sm: 15 },
                          fontWeight: active ? 700 : 600,
                          borderRadius: 9999,
                          border: "1.5px solid",
                          borderColor: active ? "transparent" : "divider",
                          transition:
                            "transform .2s, box-shadow .2s, color .2s, background .2s, border-color .2s",
                          cursor: "pointer",
                          color: active ? "#fff" : "text.primary",
                          background: active
                            ? (theme) =>
                                theme.palette.mode === "dark"
                                  ? "linear-gradient(120deg,#7c5cff,#22d3ee)"
                                  : "linear-gradient(120deg,#5b3df5,#0891b2)"
                            : (theme) =>
                                theme.palette.mode === "dark"
                                  ? "rgba(255,255,255,.035)"
                                  : "#ffffff",
                          boxShadow: active
                            ? (theme) =>
                                theme.palette.mode === "dark"
                                  ? "0 10px 28px -12px rgba(124,92,255,.75)"
                                  : "0 10px 28px -12px rgba(91,61,245,.55)"
                            : "none",
                          "&:hover": {
                            transform: "translateY(-1px)",
                          },
                        }}
                      />
                    );
                  })}
                </Box>
                {errors.services?.message ? (
                  <FormHelperText error sx={{ mt: 1 }}>
                    {errors.services.message}
                  </FormHelperText>
                ) : null}
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2,1fr)",
                  },
                  gap: { xs: 2.2, sm: 2.6, md: 3 },
                  mb: { xs: 2.6, md: 3.2 },
                }}
              >
                <FormControl error={!!errors.budget} sx={{ ...fieldSx }}>
                  <InputLabel id="budget-label">
                    {contact.form.budgetLabel}
                  </InputLabel>
                  <Controller
                    name="budget"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        labelId="budget-label"
                        label={contact.form.budgetLabel}
                        value={field.value || ""}
                        onChange={(e: SelectChangeEvent<string>) =>
                          field.onChange(e.target.value)
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                      >
                        <MenuItem value="">Prefer not to say</MenuItem>
                        {BUDGET_OPTIONS.map((opt) => (
                          <MenuItem key={opt} value={opt}>
                            {opt}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.budget?.message ? (
                    <FormHelperText>{errors.budget.message}</FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl error={!!errors.timeline} sx={{ ...fieldSx }}>
                  <InputLabel id="timeline-label">
                    {contact.form.timelineLabel}
                  </InputLabel>
                  <Controller
                    name="timeline"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        labelId="timeline-label"
                        label={contact.form.timelineLabel}
                        value={field.value || ""}
                        onChange={(e: SelectChangeEvent<string>) =>
                          field.onChange(e.target.value)
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                      >
                        <MenuItem value="">Prefer not to say</MenuItem>
                        {TIMELINE_OPTIONS.map((opt) => (
                          <MenuItem key={opt} value={opt}>
                            {opt}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.timeline?.message ? (
                    <FormHelperText>{errors.timeline.message}</FormHelperText>
                  ) : null}
                </FormControl>
              </Box>

              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <TextField
                  label={contact.form.messageLabel}
                  multiline
                  rows={5}
                  {...register("message")}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                  sx={{ ...fieldSx, width: "100%" }}
                  slotProps={{
                    input: {
                      "aria-describedby": errors.message
                        ? "message-error"
                        : undefined,
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  endIcon={
                    isSubmitting ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      <ArrowForwardIcon sx={{ fontSize: 18 }} />
                    )
                  }
                  sx={{
                    minWidth: { xs: "100%", sm: 320 },
                    maxWidth: { xs: "100%", sm: 420 },
                    background: (theme) =>
                      theme.palette.mode === "dark"
                        ? "linear-gradient(120deg,#7c5cff,#22d3ee)"
                        : "linear-gradient(120deg,#5b3df5,#0891b2)",
                    color: "#fff",
                    px: 4,
                    py: 1.8,
                    borderRadius: 9999,
                    fontWeight: 700,
                    fontSize: 16,
                    letterSpacing: "-.005em",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 16px 44px -14px rgba(124,92,255,.85)"
                        : "0 16px 44px -14px rgba(91,61,245,.65)",
                    "&:hover:not(:disabled)": {
                      background: (theme) =>
                        theme.palette.mode === "dark"
                          ? "linear-gradient(120deg,#6a4aff,#0bb8d1)"
                          : "linear-gradient(120deg,#4d2ee0,#077a98)",
                      transform: "translateY(-1px)",
                      boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                          ? "0 20px 50px -12px rgba(124,92,255,.9)"
                          : "0 20px 50px -12px rgba(91,61,245,.78)",
                    },
                    "&:disabled": {
                      opacity: 0.9,
                      color: "rgba(255,255,255,.9)",
                    },
                    transition:
                      "transform .2s, box-shadow .2s, background .2s",
                  }}
                >
                  {isSubmitting ? "Sending…" : contact.form.submitButton}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={snack.open}
        autoHideDuration={6500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          role="status"
          aria-live="polite"
          severity={snack.type}
          variant="filled"
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          sx={{
            borderRadius: 3,
            width: "100%",
            minWidth: { xs: 0, sm: 360 },
            fontWeight: 600,
            boxShadow: "0 20px 50px -20px rgba(0,0,0,.35)",
          }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
