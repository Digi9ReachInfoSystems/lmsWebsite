import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, Link } from "@mui/material";

function HeaderSection() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#E8F8F5", // Light green background
        color: "#333", // Text color
        paddingY: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://clipground.com/images/png-logos-1.png" // Replace with your logo URL
            // height={40px}
            alt="Logo"
            style={{ marginRight: "8px", width: "40px", height: "40px" }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "#000" }}
          >
            claroom{" "}
            <span style={{ fontSize: "12px", color: "#777" }}>
              Technologies
            </span>
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
          <Link
            href="#"
            underline="none"
            sx={{
              color: "#333",
              fontWeight: "medium",
              "&:hover": { color: "#000" },
            }}
          >
            E
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{
              color: "#333",
              fontWeight: "medium",
              "&:hover": { color: "#000" },
            }}
          >
            Features
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{
              color: "#333",
              fontWeight: "medium",
              "&:hover": { color: "#000" },
            }}
          >
            Pricing
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{
              color: "#333",
              fontWeight: "medium",
              "&:hover": { color: "#000" },
            }}
          >
            Testimonials
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{
              color: "#333",
              fontWeight: "medium",
              "&:hover": { color: "#000" },
            }}
          >
            Help
          </Link>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#ccc",
              color: "#333",
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": { borderColor: "#999" },
            }}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00C897", // Green button
              color: "#fff",
              textTransform: "none",
              borderRadius: "24px", // Fully rounded edges
              paddingX: 3,
              "&:hover": { backgroundColor: "#00a87d" },
            }}
          >
            Free Trial
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderSection;
