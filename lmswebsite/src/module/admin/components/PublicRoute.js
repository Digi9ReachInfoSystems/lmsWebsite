// src/module/admin/components/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("sessionData"); // Example: Replace with actual auth logic

  // Redirect to dashboard if authenticated

  return isAuthenticated
    ? React.createElement(Navigate, { to: "/admin" })
    : children;
};

export default PublicRoute;
