// src/module/admin/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check for authentication (e.g., a token in localStorage)
  const isAuthenticated = JSON.parse(localStorage.getItem("sessionData")).userId; // Example: Replace with actual auth logic

  // Redirect to login if not authenticated

  // Render children if authenticated
  return isAuthenticated
    ? children
    : React.createElement(Navigate, { to: "/login" });
};

export default ProtectedRoute;
