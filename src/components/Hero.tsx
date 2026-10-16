import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import type { Theme } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { tokens } from "../theme/theme";
import { hero } from "../content/siteContent";

const statusDotSx = {
  width: 8,
  height: 8,
  borderRadius: 9999,
  backgroundColor: "success.main" as const,
  boxShadow: (theme: Theme) =>
    `0 0 0 4px ${
      theme.palette.mode === "dark"
        ? "rgba(52,211,153,.18)"
        : "rgba(5,150,105,.18)"
    }, 0 0 14px ${
      theme.palette.mode === "dark" ? "rgba(52,211,153,.75)" : "rgba(5,150,105,.55)"
    }`,
};

const DashboardCard = () => {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Paper
      aria-hidden="true"
      role="img"
      aria-label="Sample dashboard preview"
      elevation={0}
      sx={{
        position: "relative",
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,.04)"
            : "#ffffff",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 30px 80px -30px rgba(124,92,255,.55), 0 10px 40px -20px rgba(34,211,238,.35)"
            : "0 30px 80px -30px rgba(91,61,245,.35), 0 10px 40px -20px rgba(8,145,178,.25)",
        animation: reduceMotion ? "none" : "floatDash 6s ease-in-out infinite",
        "@keyframes floatDash": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        backdropFilter: "blur(10px)",
      }}
    >
      <Box sx={{ display: "flex", gap: 0.8, mb: 2.6 }}>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
          <Box
            key={c}
            sx={{
              width: 11,
              height: 11,
              borderRadius: 9999,
              backgroundColor: c,
              opacity: 0.85,
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: { xs: 1.2, sm: 2 },
          mb: { xs: 2.4, sm: 3 },
        }}
      >
        {[
          hero.dashboard.kpiRevenue,
          hero.dashboard.kpiOrders,
          hero.dashboard.kpiOnTime,
        ].map((label, i) => (
          <Box key={label}>
            <Box
              sx={{
                p: { xs: 1, sm: 1.6 },
                borderRadius: 2.2,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,.025)"
                    : "rgba(10,20,60,.02)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: { xs: 10, sm: 11.5 },
                  fontWeight: 600,
                  color: "text.secondary",
                  display: "block",
                  mb: 0.3,
                }}
              >
                {["", "", ""][i]}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: 12.5, sm: 15 },
                  fontWeight: 800,
                  color: "text.primary",
                  letterSpacing: "-.015em",
                  lineHeight: 1.15,
                }}
              >
                {label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Typography
        variant="caption"
        sx={{
          display: "block",
          mb: 1.2,
          fontWeight: 700,
          color: "text.primary",
          fontSize: { xs: 12, sm: 13.5 },
        }}
      >
        {hero.dashboard.chartTitle}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${hero.dashboard.chartHeights.length},1fr)`,
          gap: { xs: 0.6, sm: 1 },
          height: { xs: 90, sm: 120 },
          alignItems: "flex-end",
          mb: { xs: 1.4, sm: 2 },
        }}
      >
        {hero.dashboard.chartHeights.map((h, i) => (
          <Box
            key={i}
            sx={{
              height: `${h}%`,
              minHeight: 8,
              borderRadius: 1.4,
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(180deg,#7c5cff 0%, #22d3ee 100%)"
                  : "linear-gradient(180deg,#5b3df5 0%, #0891b2 100%)",
              boxShadow: (theme) =>
                `0 6px 20px -8px ${
                  theme.palette.mode === "dark"
                    ? "rgba(124,92,255,.55)"
                    : "rgba(91,61,245,.5)"
                }`,
              opacity: 0.92 + (i / hero.dashboard.chartHeights.length) * 0.08,
              transition: "opacity .3s, transform .3s",
              "&:hover": { opacity: 1, transform: "translateY(-2px)" },
            }}
          />
        ))}
      </Box>

      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          color: "text.secondary",
          fontSize: { xs: 11, sm: 12 },
          fontWeight: 500,
        }}
      >
        {hero.dashboard.caption}
      </Typography>
    </Paper>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 40);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="header"
      id="top"
      sx={{
        position: "relative",
        overflow: "hidden",
        paddingTop: { xs: 8, sm: 10, md: 14 },
        paddingBottom: { xs: 6, md: 4 },
        isolation: "isolate",
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: -1,
          pointerEvents: "none",
          zIndex: -1,
          "&::before,&::after": {
            content: '""',
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(90px)",
          },
          "&::before": {
            top: -120,
            left: "-8%",
            width: 480,
            height: 480,
            backgroundColor: "primary.main",
            opacity: (theme) =>
              theme.palette.mode === "dark"
                ? tokens.dark.glow
                : tokens.light.glow,
          },
          "&::after": {
            top: -160,
            right: "-6%",
            width: 520,
            height: 520,
            backgroundColor: "secondary.main",
            opacity: (theme) =>
              theme.palette.mode === "dark"
                ? tokens.dark.glow * 0.9
                : tokens.light.glow * 0.9,
          },
        }}
      />

      <Container
        maxWidth={false}
        sx={{
          maxWidth: tokens.design.maxWidth,
          paddingLeft: `${tokens.design.sidePadding}px`,
          paddingRight: `${tokens.design.sidePadding}px`,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.1fr 1fr",
            },
            gap: { xs: 6, md: 6 },
            alignItems: "center",
          }}
        >
          <Box>
            <Stack
              spacing={{ xs: 2.6, sm: 3.2 }}
              sx={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity .7s ease, transform .7s ease",
                transitionDelay: "40ms",
              }}
            >
              <Chip
                label={
                  <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1.1 }}>
                    <Box sx={statusDotSx} />
                    <Box
                      component="span"
                      sx={{
                        fontWeight: 700,
                        fontSize: 13.5,
                      }}
                    >
                      Taking new projects
                    </Box>
                  </Box>
                }
                size="medium"
                sx={{
                  alignSelf: "flex-start",
                  height: 36,
                  px: 0.4,
                  borderRadius: 9999,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,.04)"
                      : "#ffffff",
                  color: "text.primary",
                  backdropFilter: "blur(8px)",
                  "& .MuiChip-label": { px: 1.5 },
                }}
              />

              <Box>
                <Typography variant="h1" component="h1">
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      color: "text.primary",
                    }}
                  >
                    {hero.h1Line1}
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      background: (theme) =>
                        theme.palette.mode === "dark"
                          ? "linear-gradient(120deg,#7c5cff 0%,#22d3ee 100%)"
                          : "linear-gradient(120deg,#5b3df5 0%,#0891b2 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {hero.h1Line2Gradient}
                  </Box>
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: 16.5, md: 17.5 },
                  lineHeight: 1.65,
                  maxWidth: "58ch",
                }}
              >
                {hero.lead}
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1.4, sm: 1.6 }}
                sx={{
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  href={hero.primaryHref}
                  size="large"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    background: (theme) =>
                      theme.palette.mode === "dark"
                        ? "linear-gradient(120deg,#7c5cff,#22d3ee)"
                        : "linear-gradient(120deg,#5b3df5,#0891b2)",
                    color: "#fff",
                    px: 3.2,
                    py: 1.6,
                    borderRadius: 9999,
                    fontWeight: 700,
                    fontSize: 15.5,
                    letterSpacing: "-.005em",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    alignSelf: { xs: "stretch", sm: "flex-start" },
                    boxShadow: (theme) =>
                      `0 14px 40px -14px ${
                        theme.palette.mode === "dark"
                          ? "rgba(124,92,255,.8)"
                          : "rgba(91,61,245,.6)"
                      }`,
                    "&:hover": {
                      background: (theme) =>
                        theme.palette.mode === "dark"
                          ? "linear-gradient(120deg,#6a4aff,#0bb8d1)"
                          : "linear-gradient(120deg,#4d2ee0,#077a98)",
                      boxShadow: (theme) =>
                        `0 18px 46px -12px ${
                          theme.palette.mode === "dark"
                            ? "rgba(124,92,255,.92)"
                            : "rgba(91,61,245,.75)"
                        }`,
                      transform: "translateY(-2px)",
                    },
                    "&:active": { transform: "translateY(0)" },
                    transition:
                      "transform .2s ease, box-shadow .2s ease, background .2s ease",
                  }}
                >
                  {hero.primaryButton}
                </Button>

                <Button
                  variant="outlined"
                  href={hero.secondaryHref}
                  size="large"
                  startIcon={<PhoneIcon sx={{ fontSize: 17 }} />}
                  sx={{
                    borderRadius: 9999,
                    px: 3,
                    py: 1.6,
                    fontWeight: 700,
                    fontSize: 15,
                    border: "1.5px solid",
                    borderColor: "divider",
                    color: "text.primary",
                    backgroundColor: "transparent",
                    alignSelf: { xs: "stretch", sm: "flex-start" },
                    "&:hover": {
                      backgroundColor: "action.hover",
                      borderColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,.2)"
                          : "rgba(0,0,0,.15)",
                    },
                    transition: "background-color .2s, border-color .2s",
                  }}
                >
                  {hero.secondaryButton}
                </Button>
              </Stack>

              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: 13,
                  fontWeight: 500,
                  mt: 0.2,
                }}
              >
                {hero.eyebrow}
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              order: { xs: -1, md: 1 },
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity .85s cubic-bezier(.2,.7,.2,1), transform .85s cubic-bezier(.2,.7,.2,1)",
              transitionDelay: "160ms",
            }}
          >
            <DashboardCard />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
