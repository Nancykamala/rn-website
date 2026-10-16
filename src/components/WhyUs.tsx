import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import type { SxProps, Theme } from "@mui/material/styles";
import { tokens } from "../theme/theme";
import { whyUs } from "../content/siteContent";
import useReveal from "../hooks/useReveal";

const reasonCardSx: SxProps<Theme> = {
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
        ? "rgba(34,211,238,.48)"
        : "rgba(8,145,178,.38)",
    boxShadow: (theme) =>
      theme.palette.mode === "dark"
        ? "0 22px 55px -32px rgba(34,211,238,.55)"
        : "0 22px 55px -32px rgba(8,145,178,.38)",
  },
};

const accentBarSx: SxProps<Theme> = {
  width: 36,
  height: 4,
  borderRadius: 9999,
  mb: 2,
  background: (theme) =>
    theme.palette.mode === "dark"
      ? "linear-gradient(90deg,#7c5cff,#22d3ee)"
      : "linear-gradient(90deg,#5b3df5,#0891b2)",
};

interface ReasonCardProps {
  title: string;
  description: string;
  delay: number;
}

const ReasonCard = ({ title, description, delay }: ReasonCardProps) => {
  const { ref, style } = useReveal<HTMLDivElement>({
    delay,
    threshold: 0.08,
  });
  return (
    <Paper ref={ref} style={style} role="article" elevation={0} sx={reasonCardSx}>
      <Box sx={accentBarSx} aria-hidden="true" />
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontSize: { xs: 19.5, md: 21 },
          fontWeight: 800,
          mb: 1.4,
          lineHeight: 1.2,
          letterSpacing: "-.015em",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontSize: 15.5, lineHeight: 1.7, color: "text.secondary" }}
      >
        {description}
      </Typography>
    </Paper>
  );
};

const WhyUs = () => {
  const headReveal = useReveal<HTMLDivElement>({ threshold: 0.06 });
  const toolsReveal = useReveal<HTMLDivElement>({ threshold: 0.06 });

  return (
    <Box
      component="section"
      id={whyUs.id}
      sx={{
        paddingTop: `${tokens.design.sectionPadding}px`,
        paddingBottom: `${tokens.design.sectionPadding}px`,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: tokens.design.maxWidth,
          paddingLeft: `${tokens.design.sidePadding}px`,
          paddingRight: `${tokens.design.sidePadding}px`,
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
            {whyUs.tag}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            {whyUs.h2}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2,1fr)",
              md: "repeat(4,1fr)",
            },
            gap: { xs: 2.2, sm: 2.6, md: 3 },
            mb: { xs: 8, md: 10 },
          }}
        >
          {whyUs.cards.map((card, i) => (
            <ReasonCard
              key={card.title}
              title={card.title}
              description={card.description}
              delay={Math.min(i * 75, 450)}
            />
          ))}
        </Box>

        <Box
          ref={toolsReveal.ref}
          style={toolsReveal.style}
        >
          <Typography
            variant="overline"
            sx={{
              display: "block",
              mb: 2.4,
              textAlign: "center",
              color: "text.secondary",
              opacity: 0.9,
            }}
          >
            {whyUs.toolsLabel}
          </Typography>
          <Box
            role="list"
            aria-label={whyUs.toolsLabel}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: { xs: 1.2, sm: 1.6 },
            }}
          >
            {whyUs.tools.map((tool, i) => (
              <Chip
                key={tool}
                role="listitem"
                label={tool}
                sx={{
                  borderRadius: 9999,
                  px: 0.4,
                  py: 0.4,
                  height: { xs: 38, sm: 42 },
                  fontSize: { xs: 13.5, sm: 14.5 },
                  fontWeight: 600,
                  color: "text.primary",
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,.035)"
                      : "#ffffff",
                  transition:
                    "transform .25s ease, background-color .25s ease, border-color .25s ease, box-shadow .25s ease, color .25s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    borderColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(124,92,255,.55)"
                        : "rgba(91,61,245,.45)",
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "#e6e0ff" : "#4a2fe0",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 8px 22px -12px rgba(124,92,255,.7)"
                        : "0 8px 22px -12px rgba(91,61,245,.45)",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(124,92,255,.08)"
                        : "rgba(91,61,245,.06)",
                  },
                  animationDelay: `${i * 20}ms`,
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyUs;
