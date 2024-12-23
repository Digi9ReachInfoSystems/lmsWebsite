// src/module/admin/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = JSON.parse(
    localStorage.getItem("sessionData")
  ).userId;

  return isAuthenticated
    ? children
    : React.createElement(Navigate, { to: "/" });
};

export default ProtectedRoute;
