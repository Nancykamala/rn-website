import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { tokens } from "../theme/theme";
import { useColorMode } from "../theme/ColorModeContext";
import { footer } from "../content/siteContent";

const Footer = () => {
  const { mode } = useColorMode();

  return (
    <Box
      component="footer"
      sx={{
        py: 4.5,
        borderTop: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.default",
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
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 1.4, sm: 2 },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: 14,
              color: "text.secondary",
              fontWeight: 500,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {footer.copyright}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: { xs: 0.8, sm: 1.2 },
            }}
          >
            <Link
              href="#top"
              underline="none"
              aria-label="DataVize IT Consulting home"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.2,
                lineHeight: 1,
                "&:hover": { opacity: 0.92 },
                fontFamily:
                  '"Plus Jakarta Sans", "Avenir Next", "Montserrat", "Segoe UI", sans-serif',
              }}
            >
              <Box
                component="img"
                src={mode === "dark" ? "/dv-mark.svg" : "/dv-mark-light.svg"}
                alt=""
                aria-hidden="true"
                sx={{
                  height: 28,
                  width: "auto",
                  display: "block",
                  flexShrink: 0,
                }}
              />
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", sm: "flex-start" },
                  lineHeight: 1,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    alignItems: "baseline",
                    fontSize: 16,
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
                    mt: "2px",
                    fontSize: 9,
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
            </Link>
            <Typography
              variant="body2"
              sx={{
                fontSize: 13.5,
                color: "text.secondary",
                fontWeight: 500,
                opacity: 0.95,
              }}
            >
              · {footer.tagline}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
