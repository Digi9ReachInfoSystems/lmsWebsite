import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import Logo from "../../../../assets/Logofinal.png";

function Header() {
  const navigate = useNavigate();

  // When user clicks the logo, navigate home
  const handleLogoClick = () => {
    navigate("/");
  };

  // Example logout handler:
  const handleLogout = () => {
    // Clear localStorage or session data
    localStorage.removeItem("sessionData");
    // Redirect to home (or login)
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fdf2f8",
        color: "#333",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "80px",
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Left Section: Logo */}
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          onClick={handleLogoClick}
          sx={{
            width: { xs: "60px", md: "140px" },
            height: { xs: "60px", md: "140px" },
            cursor: "pointer",
          }}
        />

        {/* Right Section: Logout Button */}
        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            borderColor: "#ccc",
            color: "#333",
            "&:hover": {
              borderColor: "#6A11CB",
              background: "#6A11CB",
              color: "#fff",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
