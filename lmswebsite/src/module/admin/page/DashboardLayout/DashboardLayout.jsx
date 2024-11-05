// DashboardLayout.jsx
import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar'; // Import your Sidebar
import Navbar from '../../components/Navbar/Navbar'; // Import your Navbar
import { Outlet } from 'react-router-dom';
import './DashboardLayout.css'; // Import the CSS styles

const DashboardLayout = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Box className={`dashboard-layout ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <CssBaseline />

      {/* Sidebar on the left */}
      <Box className="sidebar-container">
        <Sidebar onToggle={handleSidebarToggle} />
      </Box>

      {/* Content area on the right */}
      <Box className="main-layout">
        {/* Navbar fixed at the top */}
        <Box className="navbar-container">
          <Navbar />
        </Box>

        {/* Main content area below the navbar */}
        <Box className="page-content">
          <Outlet /> {/* Render selected page content here */}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
