import { createTheme, type ThemeOptions } from "@mui/material/styles";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

const fontFamily = "'Plus Jakarta Sans', system-ui, sans-serif";

export const designTokens = {
  maxWidth: 1120,
  sidePadding: 22,
  sectionPadding: 78,
  breakpoint: 860,
  bodyFontSize: 16,
  bodyLineHeight: 1.65,
};

export const darkPalette = {
  bg: "#07090f",
  bg2: "#0c1018",
  card: "rgba(255,255,255,.04)",
  ink: "#f2f4fa",
  muted: "#98a2b8",
  line: "rgba(255,255,255,.09)",
  a: "#7c5cff",
  b: "#22d3ee",
  c: "#34d399",
  gradient: "linear-gradient(120deg,#7c5cff,#22d3ee)",
  glow: 0.35,
};

export const lightPalette = {
  bg: "#f7f8fc",
  bg2: "#ffffff",
  card: "#ffffff",
  ink: "#0e1424",
  muted: "#566079",
  line: "#e2e6f0",
  a: "#5b3df5",
  b: "#0891b2",
  c: "#059669",
  gradient: "linear-gradient(120deg,#5b3df5,#0891b2)",
  glow: 0.14,
};

const buildTheme = (mode: "dark" | "light"): ThemeOptions => {
  const p = mode === "dark" ? darkPalette : lightPalette;
  return {
    palette: {
      mode,
      primary: {
        main: p.a,
      },
      secondary: {
        main: p.b,
      },
      success: {
        main: p.c,
      },
      background: {
        default: p.bg,
        paper: p.bg2,
      },
      text: {
        primary: p.ink,
        secondary: p.muted,
      },
      divider: p.line,
    },
    shape: {
      borderRadius: 22,
    },
    typography: {
      fontFamily,
      fontSize: designTokens.bodyFontSize,
      body1: {
        fontSize: designTokens.bodyFontSize,
        lineHeight: designTokens.bodyLineHeight,
        color: p.ink,
      },
      body2: {
        fontSize: 17,
        lineHeight: 1.65,
        color: p.muted,
      },
      h1: {
        fontSize: "clamp(36px,5.6vw,64px)",
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: "-.035em",
        color: p.ink,
      },
      h2: {
        fontSize: "clamp(27px,4vw,42px)",
        fontWeight: 800,
        lineHeight: 1.12,
        letterSpacing: "-.025em",
        color: p.ink,
        maxWidth: "20ch",
      },
      h3: {
        fontSize: 22,
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "-.015em",
        color: p.ink,
      },
      h4: {
        fontSize: 19,
        fontWeight: 700,
        lineHeight: 1.25,
        color: p.ink,
      },
      button: {
        fontSize: 15,
        fontWeight: 600,
        textTransform: "none",
      },
      overline: {
        fontSize: 14,
        fontWeight: 700,
        color: p.b,
        textTransform: "none",
        letterSpacing: 0,
        lineHeight: 1,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: designTokens.breakpoint,
        lg: 1100,
        xl: 1440,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollBehavior: "smooth",
          },
          body: {
            backgroundColor: p.bg,
            color: p.ink,
            fontFamily,
            fontSize: designTokens.bodyFontSize,
            lineHeight: designTokens.bodyLineHeight,
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
          "a, a:visited": {
            color: p.a,
            textDecoration: "none",
          },
          "a:hover": {
            textDecoration: "underline",
          },
          "*:focus-visible": {
            outline: `3px solid ${p.b}`,
            outlineOffset: 2,
          },
          "::-webkit-scrollbar": {
            width: 10,
            height: 10,
          },
          "::-webkit-scrollbar-track": {
            background: p.bg2,
          },
          "::-webkit-scrollbar-thumb": {
            background: p.line,
            borderRadius: 5,
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: p.muted,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 9999,
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 22,
            paddingRight: 22,
            fontWeight: 600,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  };
};

export const darkTheme = createTheme(buildTheme("dark"));
export const lightTheme = createTheme(buildTheme("light"));

export const tokens = {
  design: designTokens,
  dark: darkPalette,
  light: lightPalette,
};
