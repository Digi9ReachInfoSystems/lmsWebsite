// DashboardLayout.jsx
import React, { useState } from "react";

import Sidebar from "../../components/Sidebar/Sidebar"; // Import your Sidebar
import Navbar from "../../components/Navbar/Navbar"; // Import your Navbar
import { Outlet } from "react-router-dom";
import { GlobalStyles } from "../../../../style/GlobalStyles/GlobalStyles";

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
