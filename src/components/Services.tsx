import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import type { SxProps, Theme } from "@mui/material/styles";
import { tokens } from "../theme/theme";
import { services } from "../content/siteContent";
import useReveal from "../hooks/useReveal";

const serviceIconSx: SxProps<Theme> = {
  width: 46,
  height: 46,
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 22,
  background: (theme) =>
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #7c5cff, #22d3ee)"
      : "linear-gradient(135deg, #5b3df5, #0891b2)",
  color: "#fff",
  mb: 2.4,
  flexShrink: 0,
  boxShadow: (theme) =>
    theme.palette.mode === "dark"
      ? "0 10px 26px -12px rgba(124,92,255,.75)"
      : "0 10px 26px -12px rgba(91,61,245,.6)",
};

const serviceCardSx: SxProps<Theme> = {
  p: 3.6,
  height: "100%",
  borderRadius: 3,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: (theme) =>
    theme.palette.mode === "dark" ? "rgba(255,255,255,.04)" : "#ffffff",
  position: "relative",
  overflow: "hidden",
  transition:
    "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    padding: "1px",
    background: (theme) =>
      theme.palette.mode === "dark"
        ? "linear-gradient(135deg, rgba(124,92,255,.45), rgba(34,211,238,.28) 45%, transparent 75%)"
        : "linear-gradient(135deg, rgba(91,61,245,.35), rgba(8,145,178,.22) 45%, transparent 75%)",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity .3s ease",
  },
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: (theme) =>
      theme.palette.mode === "dark"
        ? "0 24px 60px -30px rgba(124,92,255,.7), 0 14px 40px -22px rgba(34,211,238,.4)"
        : "0 24px 60px -30px rgba(91,61,245,.45), 0 14px 40px -22px rgba(8,145,178,.28)",
    "&::before": { opacity: 1 },
  },
};

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard = ({ icon, title, description, delay }: ServiceCardProps) => {
  const { ref, style } = useReveal<HTMLDivElement>({
    delay,
    threshold: 0.08,
  });
  return (
    <Paper ref={ref} style={style} role="article" elevation={0} sx={serviceCardSx}>
      <Box sx={serviceIconSx} aria-hidden="true">
        {icon}
      </Box>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontSize: { xs: 19.5, md: 20.5 },
          fontWeight: 800,
          mb: 1.2,
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

const Services = () => {
  const headReveal = useReveal<HTMLDivElement>({ threshold: 0.06 });

  return (
    <Box
      component="section"
      id={services.id}
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
          sx={{ mb: { xs: 6, md: 7.5 }, maxWidth: "64ch" }}
        >
          <Typography
            variant="overline"
            sx={{
              display: "inline-block",
              mb: 1.6,
            }}
          >
            {services.tag}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            {services.h2}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 17, lineHeight: 1.65 }}>
            {services.sub}
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
          {services.cards.map((card, i) => (
            <ServiceCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              delay={Math.min(i * 65, 390)}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
