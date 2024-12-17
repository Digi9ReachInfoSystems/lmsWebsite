import React from "react";
import { Box, Typography, Button } from "@mui/material";

function HeroContent() {
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      {/* Background Gradient */}
      <Box
        sx={{
          background: "linear-gradient(to bottom, #E8F8F5, #6A11CB)",
          position: "relative",
          color: "#fff",
          textAlign: "center",
          padding: "6rem 2rem 4rem",
          zIndex: 1,
        }}
      >
        {/* Floating Icons */}
        <Box
          component="div"
          sx={{
            position: "absolute",
            top: "7%",
            left: "5%",
            width: "30px",
            height: "30px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Box
          component="div"
          sx={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#00C897",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Box
          component="div"
          sx={{
            position: "absolute",
            top: "38%",
            right: "25%",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#00C897",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        />{" "}
        <Box
          component="div"
          sx={{
            position: "absolute",
            top: "58%",
            right: "6%",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#00C897",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: "1rem",
            fontSize: "2.5rem",
          }}
        >
          Everything you need to manage your educational institution
        </Typography>
        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{ marginBottom: "2rem", fontSize: "1.1rem" }}
        >
          Classe365 is the modern student management software for running any
          type of educational institution.
        </Typography>
        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#26D07C",
              color: "#fff",
              padding: "0.75rem 2rem",
              fontWeight: "bold",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#21b96e" },
            }}
          >
            Try Free
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#9EA8FF",
              color: "#fff",
              padding: "0.75rem 2rem",
              fontWeight: "bold",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#8498E8" },
            }}
          >
            Request a Demo
          </Button>
        </Box>
        {/* Dashboard Mockup Image */}
        <Box
          component="img"
          src="https://static.vecteezy.com/system/resources/previews/000/457/141/original/landing-page-template-of-website-design-illustration-concept-isometric-flat-design-concept-of-web-page-design-for-website-and-mobile-website-vector-illustration.jpg" // Replace with your dashboard mockup image
          alt="Dashboard Mockup"
          sx={{
            width: "80%",
            height: "550px",
            maxWidth: "800px",
            margin: "3rem auto 0",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
          }}
        />
      </Box>

      {/* Bottom Curve */}
      <Box
        component="div"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          lineHeight: 0,
        }}
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "150px", display: "block" }}
        >
          <path
            fill="#FFFFFF"
            fillOpacity="1"
            d="M0,256L80,234.7C160,213,320,171,480,149.3C640,128,800,128,960,149.3C1120,171,1280,213,1360,234.7L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </Box>
    </Box>
  );
}

export default HeroContent;
