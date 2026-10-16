import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import type { SxProps, Theme } from "@mui/material/styles";
import { tokens } from "../theme/theme";
import { whoWeHelp } from "../content/siteContent";
import useReveal from "../hooks/useReveal";

const iconTileSx: SxProps<Theme> = {
  width: 46,
  height: 46,
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 22,
  background: (theme) =>
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(124,92,255,.22), rgba(34,211,238,.18))"
      : "linear-gradient(135deg, rgba(91,61,245,.14), rgba(8,145,178,.12))",
  border: "1px solid",
  borderColor: "divider",
  mb: 2,
  flexShrink: 0,
};

const cardSx: SxProps<Theme> = {
  p: 3.2,
  height: "100%",
  borderRadius: 3,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: (theme) =>
    theme.palette.mode === "dark" ? "rgba(255,255,255,.04)" : "#ffffff",
  transition:
    "transform .3s ease, box-shadow .3s ease, border-color .3s ease, background-color .3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    borderColor: (theme) =>
      theme.palette.mode === "dark"
        ? "rgba(124,92,255,.45)"
        : "rgba(91,61,245,.35)",
    boxShadow: (theme) =>
      theme.palette.mode === "dark"
        ? "0 20px 50px -28px rgba(124,92,255,.55)"
        : "0 20px 50px -28px rgba(91,61,245,.35)",
  },
};

interface AudienceCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const AudienceCard = ({ icon, title, description, delay }: AudienceCardProps) => {
  const { ref, style } = useReveal<HTMLDivElement>({
    delay,
    threshold: 0.08,
  });
  return (
    <Paper ref={ref} style={style} role="article" elevation={0} sx={cardSx}>
      <Box sx={iconTileSx} aria-hidden="true">
        {icon}
      </Box>
      <Typography
        variant="h4"
        component="h3"
        sx={{ mb: 1, fontSize: 19, fontWeight: 700 }}
      >
        {title}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: 15.5, lineHeight: 1.65 }}>
        {description}
      </Typography>
    </Paper>
  );
};

const WhoWeHelp = () => {
  const { ref, style } = useReveal<HTMLDivElement>({ threshold: 0.06 });

  return (
    <Box
      component="section"
      id={whoWeHelp.id}
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
          ref={ref}
          style={style}
          sx={{ mb: { xs: 6, md: 7 }, maxWidth: "64ch" }}
        >
          <Typography
            variant="overline"
            sx={{
              display: "inline-block",
              mb: 1.6,
            }}
          >
            {whoWeHelp.tag}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            {whoWeHelp.h2}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 17, lineHeight: 1.65 }}>
            {whoWeHelp.sub}
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
            gap: { xs: 2.2, sm: 2.4, md: 3 },
          }}
        >
          {whoWeHelp.cards.map((card, i) => (
            <AudienceCard
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

export default WhoWeHelp;
