// DashboardLayout.jsx
import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar"; // Import your Sidebar
import Navbar from "../../components/Navbar/Navbar"; // Import your Navbar
import { Outlet } from "react-router-dom";
// import "./DashboardLayout.css"; // Import the CSS styles

const DashboardLayout = () => {
  return (
    <div className="page-wrapper">
      <Sidebar />

      <div className="content-wrapper">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
