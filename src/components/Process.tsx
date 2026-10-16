import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { SxProps, Theme } from "@mui/material/styles";
import { tokens } from "../theme/theme";
import { process as processContent } from "../content/siteContent";
import useReveal from "../hooks/useReveal";

const stepNumberSx: SxProps<Theme> = {
  width: 52,
  height: 52,
  borderRadius: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 800,
  fontSize: 20,
  letterSpacing: "-.02em",
  flexShrink: 0,
  background: (theme) =>
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg,#7c5cff,#22d3ee)"
      : "linear-gradient(135deg,#5b3df5,#0891b2)",
  color: "#fff",
  boxShadow: (theme) =>
    theme.palette.mode === "dark"
      ? "0 10px 28px -10px rgba(124,92,255,.75), 0 6px 18px -8px rgba(34,211,238,.55)"
      : "0 10px 28px -10px rgba(91,61,245,.6), 0 6px 18px -8px rgba(8,145,178,.45)",
  position: "relative",
  zIndex: 1,
};

const stepCardSx: SxProps<Theme> = {
  p: 3.6,
  height: "100%",
  borderRadius: 3,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: (theme) =>
    theme.palette.mode === "dark" ? "rgba(255,255,255,.04)" : "#ffffff",
  transition:
    "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    borderColor: (theme) =>
      theme.palette.mode === "dark"
        ? "rgba(124,92,255,.5)"
        : "rgba(91,61,245,.4)",
    boxShadow: (theme) =>
      theme.palette.mode === "dark"
        ? "0 22px 55px -32px rgba(124,92,255,.65)"
        : "0 22px 55px -32px rgba(91,61,245,.45)",
  },
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  delay: number;
}

const StepCard = ({ number, title, description, delay }: StepCardProps) => {
  const { ref, style } = useReveal<HTMLDivElement>({
    delay,
    threshold: 0.08,
  });
  return (
    <Paper ref={ref} style={style} role="article" elevation={0} sx={stepCardSx}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={stepNumberSx} aria-hidden="true">
          {number}
        </Box>
        <Box>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: 20, md: 21.5 },
              fontWeight: 800,
              mb: 1.1,
              lineHeight: 1.2,
              letterSpacing: "-.015em",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: 15.5,
              lineHeight: 1.7,
              color: "text.secondary",
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

const Process = () => {
  const headReveal = useReveal<HTMLDivElement>({ threshold: 0.06 });

  return (
    <Box
      component="section"
      id={processContent.id}
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
              ? "radial-gradient(60% 50% at 50% 0%, rgba(124,92,255,.12) 0%, transparent 70%), radial-gradient(50% 50% at 80% 100%, rgba(34,211,238,.10) 0%, transparent 70%)"
              : "radial-gradient(60% 50% at 50% 0%, rgba(91,61,245,.08) 0%, transparent 70%), radial-gradient(50% 50% at 80% 100%, rgba(8,145,178,.07) 0%, transparent 70%)",
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
          style={headReveal.style}
          sx={{ mb: { xs: 6, md: 7.5 }, maxWidth: "60ch" }}
        >
          <Typography
            variant="overline"
            sx={{
              display: "inline-block",
              mb: 1.6,
            }}
          >
            {processContent.tag}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            {processContent.h2}
          </Typography>
          {processContent.sub && (
            <Typography variant="body2" sx={{ fontSize: 17, lineHeight: 1.65 }}>
              {processContent.sub}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2,1fr)",
              md: "repeat(4,1fr)",
            },
            gap: { xs: 2.4, sm: 2.6, md: 3 },
          }}
        >
          {processContent.steps.map((step, i) => (
            <Box key={step.title} sx={{ position: "relative" }}>
              <StepCard
                number={i + 1}
                title={step.title}
                description={step.description}
                delay={Math.min(i * 80, 480)}
              />
              {i < processContent.steps.length - 1 && (
                <Box
                  aria-hidden="true"
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    right: -30,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 42,
                    height: 42,
                    color: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(124,92,255,.6)"
                        : "rgba(91,61,245,.5)",
                  }}
                >
                  <ArrowForwardIcon sx={{ fontSize: 28 }} />
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Process;
