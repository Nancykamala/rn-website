import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { tokens } from "../theme/theme";
import { useColorMode } from "../theme/ColorModeContext";
import { navbar } from "../content/siteContent";
import dataviseMark from "../assets/datavise-mark.svg";
import dataviseMarkLight from "../assets/datavise-mark-light.svg";

const BrandMark = ({ size = 34 }: { size?: number }) => {
  const { mode } = useColorMode();
  return (
    <Box
      component="img"
      src={mode === "dark" ? dataviseMark : dataviseMarkLight}
      alt=""
      aria-hidden="true"
      sx={{
        height: size,
        width: "auto",
        display: "block",
        flexShrink: 0,
      }}
    />
  );
};

const BrandWordmark = ({
  fontSize = 22,
}: {
  fontSize?: number | string;
}) => (
  <Box
    component="span"
    aria-label="DataVize IT Consulting"
    sx={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      lineHeight: 1,
      whiteSpace: "nowrap",
      fontFamily: '"Plus Jakarta Sans", "Avenir Next", "Montserrat", "Segoe UI", sans-serif',
    }}
  >
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "baseline",
        fontSize,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        lineHeight: 1.05,
      }}
    >
      <Box
        component="span"
        sx={{
          color: (theme) =>
            theme.palette.mode === "dark" ? "#FAFCFF" : "#071426",
        }}
      >
        Data
      </Box>
      <Box
        component="span"
        sx={{
          background:
            "linear-gradient(90deg, #006CFF 0%, #00BED2 50%, #00DDB0 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
        }}
      >
        Vize
      </Box>
    </Box>
    <Box
      component="span"
      sx={{
        mt: "3px",
        fontSize:
          typeof fontSize === "number"
            ? Math.max(9, Math.round(fontSize * 0.29))
            : "0.29em",
        fontWeight: 400,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: (theme) =>
          theme.palette.mode === "dark" ? "#FAFCFF" : "#071426",
        lineHeight: 1.1,
      }}
    >
      IT Consulting
    </Box>
  </Box>
);

const Navbar = () => {
  const { mode, toggleColorMode } = useColorMode();
  const isDesktop = useMediaQuery("(min-width:860px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppBar
      component="nav"
      position="sticky"
      elevation={0}
      sx={{
        height: 66,
        justifyContent: "center",
        zIndex: (t) => t.zIndex.appBar,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        backgroundColor: (theme) =>
          scrolled
            ? theme.palette.mode === "dark"
              ? "rgba(7,9,15,0.72)"
              : "rgba(247,248,252,0.78)"
            : "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        transition: "background-color .2s ease",
        borderBottom: "1px solid",
        borderColor: "divider",
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
        <Toolbar disableGutters sx={{ minHeight: 66, gap: 2 }}>
          <Link
            href="#top"
            underline="none"
            color="inherit"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.6,
              mr: "auto",
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "-.02em",
              color: "text.primary",
              "&:hover": { textDecoration: "none" },
            }}
            aria-label="DataVize IT Consulting home"
          >
            <BrandMark />
            <BrandWordmark />
          </Link>

          {isDesktop ? (
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ alignItems: "center" }}
            >
              {navbar.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  underline="none"
                  color="text.primary"
                  sx={{
                    px: 1.8,
                    py: 1,
                    borderRadius: 9999,
                    fontSize: 14.5,
                    fontWeight: 600,
                    opacity: 0.88,
                    transition: "opacity .2s, background-color .2s",
                    "&:hover": {
                      opacity: 1,
                      backgroundColor: "action.hover",
                      textDecoration: "none",
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          ) : (
            <Tooltip title="Open menu" placement="bottom">
              <IconButton
                onClick={() => setDrawerOpen(true)}
                color="inherit"
                aria-label="Open navigation menu"
                sx={{ ml: 0.5 }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}

          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          >
            <Tooltip
              title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              placement="bottom"
            >
              <IconButton
                onClick={toggleColorMode}
                color="inherit"
                aria-label={
                  mode === "dark"
                    ? "Switch to light color mode"
                    : "Switch to dark color mode"
                }
                sx={{
                  width: 40,
                  height: 40,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "action.hover",
                  transition: "transform .2s",
                  "&:hover": {
                    transform: "rotate(12deg)",
                    backgroundColor: "action.selected",
                  },
                }}
              >
                {mode === "dark" ? (
                  <LightModeIcon fontSize="small" />
                ) : (
                  <DarkModeIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>

            {isDesktop && (
              <Button
                variant="contained"
                href={navbar.ctaHref}
                sx={{
                  background: "#fff",
                  color: "#071426",
                  px: 2.6,
                  py: 1.1,
                  fontWeight: 700,
                  fontSize: 14.5,
                  boxShadow: "0 10px 30px -12px rgba(7,20,38,0.35)",
                  "&:hover": {
                    background: "#f3f6fb",
                    boxShadow: "0 14px 36px -12px rgba(7,20,38,0.45)",
                    transform: "translateY(-2px)",
                  },
                  transition:
                    "transform .2s ease, box-shadow .2s ease, background .2s ease",
                }}
              >
                {navbar.ctaButton}
              </Button>
            )}
          </Stack>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: "min(86vw, 340px)",
              borderLeft: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.default",
              pt: 2,
            },
          },
        }}
      >
        <Box sx={{ px: 3, pb: 2, display: "flex", alignItems: "center", gap: 1.6 }}>
          <BrandMark size={30} />
          <BrandWordmark fontSize={20} />
        </Box>
        <List sx={{ px: 2 }}>
          {navbar.links.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                component="a"
                sx={{
                  borderRadius: 2.5,
                  mb: 0.5,
                  fontWeight: 600,
                }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              href={navbar.ctaHref}
              onClick={() => setDrawerOpen(false)}
              sx={{
                background: "#fff",
                color: "#071426",
                fontWeight: 700,
                boxShadow: "0 10px 30px -12px rgba(7,20,38,0.35)",
                "&:hover": {
                  background: "#f3f6fb",
                },
              }}
            >
              {navbar.ctaButton}
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
