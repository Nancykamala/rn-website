import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { tokens } from "../theme/theme";
import { footer, businessName } from "../content/siteContent";

const Footer = () => {
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
          <Typography
            variant="body2"
            sx={{
              fontSize: 13.5,
              color: "text.secondary",
              fontWeight: 500,
              textAlign: { xs: "center", sm: "right" },
              opacity: 0.95,
            }}
          >
            <Link
              href="#top"
              underline="none"
              sx={{
                color: "inherit",
                "&:hover": {
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "#7c5cff" : "#5b3df5",
                },
              }}
            >
              {businessName}
            </Link>{" "}
            · {footer.tagline}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
