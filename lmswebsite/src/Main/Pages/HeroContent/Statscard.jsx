import React from "react";
import { Box, Typography } from "@mui/material";

function StatsCard({ title, value, icon, bgColor, position }) {
  return (
    <Box
      sx={{
        position: "absolute", // Ensure this is relative to a parent
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        padding: "1rem 1.5rem",
        width: "180px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        animation: "floatAnimation 4s ease-in-out infinite", // Replace `${floatAnimation}`
        zIndex: 10,
        ...position, // Dynamically apply position styles
      }}
    >
      <Box
        sx={{
          backgroundColor: bgColor,
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",

          "@media (max-width: 768px)": {
            width: "30px",
            height: "30px",
          },
          "@media (max-width: 480px)": {
            width: "35px",
            height: "25px",
          },
          "@media (max-width: 320px)": {
            width: "30px",
            height: "20px",
          },
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{ color: "#6c757d", fontFamily: "Nunito, sans-serif" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontFamily: "Nunito, sans-serif",

            "@media (max-width: 768px)": {
              fontSize: "1rem",
            },
            "@media (max-width: 480px)": {
              fontSize: "0.8rem",
            },
            "@media (max-width: 320px)": {
              fontSize: "0.7rem",
            },
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

export default StatsCard;
