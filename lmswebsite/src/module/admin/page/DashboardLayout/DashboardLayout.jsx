// DashboardLayout.jsx
import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar'; // Import your Sidebar
import Navbar from '../../components/Navbar/Navbar'; // Import your Navbar
import { Outlet } from 'react-router-dom';
import './DashboardLayout.css'; // Import the CSS styles

const DashboardLayout = () => {
  


  return (
    <Box className="dashboard-layout">
      <CssBaseline />

      {/* Navbar */}
      <Navbar  />

      <Box className="dashboard-content">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <Box className="page-content">
          <Outlet /> {/* Render selected page content here */}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
