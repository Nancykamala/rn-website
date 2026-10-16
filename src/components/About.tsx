import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import type { SxProps, Theme } from "@mui/material/styles";
import { tokens } from "../theme/theme";
import { m365Section } from "../content/siteContent";
import useReveal from "../hooks/useReveal";

const m365IconSx: SxProps<Theme> = {
  width: 46,
  height: 46,
  borderRadius: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 22,
  background: (theme) =>
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(34,211,238,.22), rgba(124,92,255,.2))"
      : "linear-gradient(135deg, rgba(8,145,178,.16), rgba(91,61,245,.14))",
  border: "1px solid",
  borderColor: "divider",
  mb: 2.4,
  flexShrink: 0,
};

const m365CardSx: SxProps<Theme> = {
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
        ? "rgba(34,211,238,.5)"
        : "rgba(8,145,178,.4)",
    boxShadow: (theme) =>
      theme.palette.mode === "dark"
        ? "0 22px 55px -30px rgba(34,211,238,.55), 0 12px 36px -22px rgba(124,92,255,.4)"
        : "0 22px 55px -30px rgba(8,145,178,.35), 0 12px 36px -22px rgba(91,61,245,.28)",
  },
};

interface M365CardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const M365Card = ({ icon, title, description, delay }: M365CardProps) => {
  const { ref, style } = useReveal<HTMLDivElement>({
    delay,
    threshold: 0.08,
  });
  return (
    <Paper ref={ref} style={style} role="article" elevation={0} sx={m365CardSx}>
      <Box sx={m365IconSx} aria-hidden="true">
        {icon}
      </Box>
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
        sx={{ fontSize: 15.5, lineHeight: 1.65, color: "text.secondary" }}
      >
        {description}
      </Typography>
    </Paper>
  );
};

const About = () => {
  const headReveal = useReveal<HTMLDivElement>({ threshold: 0.06 });

  return (
    <Box
      component="section"
      id="about"
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
          sx={{ mb: { xs: 6, md: 7.5 }, maxWidth: "68ch" }}
        >
          <Typography
            variant="overline"
            sx={{
              display: "inline-block",
              mb: 1.6,
            }}
          >
            {m365Section.tag}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 2.2 }}>
            {m365Section.h2}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 17, lineHeight: 1.7 }}>
            {m365Section.sub}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2,1fr)",
              md: "repeat(3,1fr)",
            },
            gap: { xs: 2.2, sm: 2.6, md: 3 },
          }}
        >
          {m365Section.cards.map((card, i) => (
            <M365Card
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              delay={Math.min(i * 75, 450)}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default About;
